'use strict';
var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET login page. */
router.get('/', function (req, res) {
    res.render('signin');
});

//Try to login with passport
router.post('/', passport.authenticate('local', {
    successRedirect: '/furniture',
    failureRedirect: '/signin',
    failureMessage: 'Invalid Login'
}));

module.exports = router;