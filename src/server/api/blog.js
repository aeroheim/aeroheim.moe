const express = require('express');
const path = require('path');
const fs = require('fs');

const contentPath = path.join(__dirname, '../../../content/blog');
const router = express.Router();

const filterStaticFiles = (req, res, next) =>
{
    if (req.params['0'] && (req.params['0'].endsWith('.md') || req.params['0'].endsWith('.json')))
    {
        res.sendStatus(403);
    }
    else
    {
        next();
    }
}

router.use('/blog/*', filterStaticFiles);
router.use('/blog', express.static(contentPath));
router.get('/api/blog', (req, res) =>
{
    req.app.locals.db.blog.find({}).sort({ date: -1 }).exec((err, posts) =>
    {
        if (err)
        {
            res.sendStatus(404);
        }
        else
        {
            res.send(posts);
        }
    });
});
router.get('/api/blog/:id', (req, res) =>
{
    req.app.locals.db.blog.findOne({'_id': req.params.id}, (err, post) =>
    {
        if (err || post === null)
        {
            res.sendStatus(404);
        }
        else
        {
            fs.readFile(path.join(contentPath, `${post._id}/${post._id}.md`), 'utf8', (err, data) =>
            {
                if (err)
                {
                    res.sendStatus(404);
                }
                else
                {
                    res.send(Object.assign({}, post, { content: data }));
                }
            });
        }
    });
});

module.exports = 
{
    router: router,
    storePath: path.join(contentPath, 'blog.json')
}