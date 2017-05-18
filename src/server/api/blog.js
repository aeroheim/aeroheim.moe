const express = require('express');
const router = express.Router();

router.get('/blog', (req, res) =>
{
    req.app.locals.db.collection('blog').find().toArray()
    .then((result) =>
    {
        res.send(result);
    })
    .catch((err) =>
    {
        res.sendStatus(404);
    });
});

router.get('/blog/:id', (req, res) =>
{
    req.app.locals.db.collection('blog').findOne({'_id': req.params.id})
    .then((result) =>
    {
        res.send(result);
    })
    .catch((err) =>
    {
        res.sendStatus(404);
    });
});

module.exports = router;