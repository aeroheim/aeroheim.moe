/* eslint-disable consistent-return */

const fs = require('fs');
const path = require('path');
const express = require('express');
const { query } = require('express-validator/check');
const { filterStaticContent, filterQuery, validateExpressValidator } = require('../middleware/validation');

const blogContentPath = path.join(__dirname, '../../../content/blog');
const DEFAULT_PAGINATION_LIMIT = 5;

const validateBlogQuery = [
  filterQuery(q => ['page', 'limit'].includes(q)),
  query('limit').optional().isInt({ min: 0 }),
  query('page').optional().isInt({ min: 1 }),
  validateExpressValidator,
];

function handleBlogRequest(req, res) {
  const limit = req.query.limit ? req.query.limit : DEFAULT_PAGINATION_LIMIT;
  req.app.locals.db.blog.count({}, (err, count) => {
    if (err) {
      return res.sendStatus(404);
    }

    const pages = Math.ceil(count / limit); // pages are one-indexed
    const page = req.query.page ? Math.min(req.query.page, pages) : 1;
    req.app.locals.db.blog.find({}).sort({ date: -1 }).skip(limit * (page - 1)).limit(limit)
      .exec((err, posts) => {
        if (err) {
          return res.sendStatus(404);
        }

        return res.json({
          posts,
          limit,
          page,
          pages,
        });
      });
  });
}

const validateBlogPostQuery = [
  filterQuery(q => ['limit'].includes(q)),
  query('limit').optional().isInt({ min: 0 }),
  validateExpressValidator,
];

function handleBlogPostRequest(req, res) {
  // find post
  req.app.locals.db.blog.findOne({ _id: req.params.id }, (err, post) => {
    if (err || !post) {
      return res.sendStatus(404);
    }

    const json = Object.assign({}, post);
    json.limit = req.query.limit ? req.query.limit : DEFAULT_PAGINATION_LIMIT;

    // find previous post
    req.app.locals.db.blog.find({ date: { $lt: post.date } }).sort({ date: -1 }).limit(1).exec((err, prevPost) => {
      if (err) {
        return res.sendStatus(404);
      }

      if (prevPost.length !== 0) {
        json.prevPost = prevPost[0];
      }

      // find next post and current page of post.
      req.app.locals.db.blog.find({ date: { $gt: post.date } }).sort({ date: 1 }).exec((err, newerPosts) => {
        if (err) {
          return res.sendStatus(404);
        }

        if (newerPosts.length !== 0) {
          json.nextPost = newerPosts[0];
        }

        json.page = Math.floor(newerPosts.length / json.limit) + 1;

        // finally read post content.
        fs.readFile(path.join(blogContentPath, `${post._id}/${post._id}.md`), 'utf8', (err, data) => {
          if (err) {
            return res.sendStatus(404);
          }

          json.content = data;
          return res.json(json);
        });
      });
    });
  });
}

const router = express.Router();
router.use('/blog/*', filterStaticContent(staticContent => !staticContent.endsWith('.md') && !staticContent.endsWith('.json')));
router.use('/blog', express.static(blogContentPath));
router.get('/api/blog', validateBlogQuery, handleBlogRequest);
router.get('/api/blog/:id', validateBlogPostQuery, handleBlogPostRequest);

module.exports = {
  router,
  storePath: path.join(blogContentPath, 'blog.json'),
};
