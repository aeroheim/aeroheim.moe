const express = require('express');
const router = express.Router();

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
        if (err)
        {
            res.sendStatus(404);
        }
        else
        {
            res.send(post);
        }
    });
});

module.exports = router;