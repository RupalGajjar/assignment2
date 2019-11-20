'use strict';
var express = require('express');
var router = express.Router();

/* GET furniture page. */
router.get('/', function (req, res) {
    res.render('furniture', { title: 'furniture' });
});

module.exports = router;
