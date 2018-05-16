const express = require('express');
const router = express.Router();

router.get('/projects', (req, res) =>
{
    console.log('/projects');
});

router.get('/projects/:id', (req, res) =>
{
    console.log('/projects/:id');
});

module.exports = router;