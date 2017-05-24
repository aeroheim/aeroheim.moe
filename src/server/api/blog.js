const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const apiRouter = express.Router();
const contentPath = path.join(__dirname, '../../../content/blog');

apiRouter.get('/blog', (req, res) =>
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

apiRouter.get('/blog/:id', (req, res) =>
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

router.get('/blog/:id/:file', (req, res) =>
{
    const asset = path.join(contentPath, req.params.id, req.params.file);
    console.log(asset);
    fs.exists(path.join(contentPath, req.params.id, req.params.file), (exists) =>
    {
        if (exists)
        {
            res.sendFile(asset);
        }
        else
        {
            res.sendStatus(404);
        }
    });
});

module.exports = 
{
    router: router,
    apiRouter: apiRouter,
    storePath: path.join(contentPath, 'blog.json')
}