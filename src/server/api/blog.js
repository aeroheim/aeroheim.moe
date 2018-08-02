const fs = require('fs');
const path = require('path');
const express = require('express');
const { query, validationResult } = require('express-validator/check');
const blogContentPath = path.join(__dirname, '../../../content/blog');

const filterContent = (req, res, next) =>
{
    if (req.params['0'] && (req.params['0'].endsWith('.md') || req.params['0'].endsWith('.json')))
    {
        return res.sendStatus(403);
    }

    next();
}

const validateBlogQuery = [ query('limit').optional().isInt({ min: 0 }), query('page').optional().isInt({ min: 1 })];
function handleBlogRequest(req, res)
{
    const errors = validationResult(req);
    if (!errors.isEmpty())
    {
        return res.status(422).json({ errors: errors.array() });
    }

    // default limit for pagination is 5 posts
    const limit = req.query.limit ? req.query.limit : 5;
    req.app.locals.db.blog.count({}, (err, count) =>
    {
        if (err)
        {
            return res.sendStatus(404);
        }

        // pages are one-indexed
        const pages = Math.ceil(count / limit);
        const page = req.query.page ? Math.min(req.query.page, pages) : 1;

        req.app.locals.db.blog.find({}).sort({ date: -1 }).skip(limit * (page - 1)).limit(limit).exec((err, posts) =>
        {
            if (err)
            {
                return res.sendStatus(404);
            }

            return res.json({
                posts: posts,
                page: page,
                pages: pages
            });
        });
    });
}

function handleBlogPostRequest(req, res)
{
    // find post
    req.app.locals.db.blog.findOne({'_id': req.params.id}, (err, post) =>
    {
        if (err || !post)
        {
            return res.sendStatus(404);
        }

        var json = Object.assign({}, post);

        // find previous post
        req.app.locals.db.blog.find({'date': { $lt: post.date }}).sort({ date: -1 }).limit(1).exec((err, prevPost) =>
        {
            if (err)
            {
                return res.sendStatus(404);
            }

            json = Object.assign(json, prevPost.length !== 0 ? { prevPost: prevPost[0] } : null);

            // find next post
            req.app.locals.db.blog.find({'date': { $gt: post.date }}).sort({ date: 1 }).limit(1).exec((err, nextPost) =>
            {
                if (err)
                {
                    return res.sendStatus(404);
                }

                json = Object.assign(json, nextPost.length !== 0 ? { nextPost: nextPost[0] } : null);

                // get post content
                fs.readFile(path.join(blogContentPath, `${post._id}/${post._id}.md`), 'utf8', (err, data) =>
                {
                    if (err)
                    {
                        return res.sendStatus(404);
                    }

                    json = Object.assign(json, { content: data });
                    return res.json(json);
                });
            });
        });
    });
}

const router = express.Router();
router.use('/blog/*', filterContent);
router.use('/blog', express.static(blogContentPath));
router.get('/api/blog', validateBlogQuery, handleBlogRequest);
router.get('/api/blog/:id', handleBlogPostRequest);

module.exports = 
{
    router: router,
    storePath: path.join(blogContentPath, 'blog.json')
}