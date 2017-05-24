const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const rootPath = path.join(__dirname, '../../../content/blog');

router.get('/blog', (req, res) =>
{
    req.app.locals.db.blog.find({}, (err, posts) =>
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

router.get('/blog/:id', (req, res) =>
{
    req.app.locals.db.blog.findOne({'_id': req.params.id}, (err, post) =>
    {
        if (err || post === null)
        {
            res.sendStatus(404);
        }
        else
        {
            fs.readFile(path.join(rootPath, `${post._id}/${post._id}.md`), 'utf8', (err, data) =>
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
    storePath: path.join(rootPath, 'blog.json')
}