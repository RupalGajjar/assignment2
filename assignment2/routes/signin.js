'use strict';
var express = require('express');
var router = express.Router();

/* GET contact page. */
router.get('/', function (req, res) {
    res.render('signin', { title: 'Signin' });
});

module.exports = router;
