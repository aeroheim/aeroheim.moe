const express = require('express');
const router = express.Router();

router.get('/bumps', (req, res) =>
{
    console.log('/bumps');
});

router.get('/bumps/:id', (req, res) =>
{
    console.log('/bumps/:id');
});

module.exports = router;