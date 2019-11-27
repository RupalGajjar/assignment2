'use strict';
var express = require('express');
var router = express.Router();
var advertisements = require('../models/db');

/* GET home page. */
router.get('/', isLoggedIn, function (req, res) {
    res.redirect('/furniture');
});
// List Advertisement Page
router.get('/furniture', isLoggedIn, function (req, res) {
    var msg = req.query.msg;

    advertisements.find(function (err, advertisements) {

        if (err) console.log(err);
        else
            if (msg === undefined) res.render('furniture', { allAdvertisements: advertisements });
            else res.render('furniture', { allAdvertisements: advertisements, msg: msg });
    });
});
//Add Advertisement Page
router.get('/furniture/add', isLoggedIn, function (req, res) {
    res.render('addfurniture');
});

router.post('/furniture/add', isLoggedIn, function (req, res) {
    advertisements.create({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
    }, function (err, advertisement) {
        if (err) console.log(err);
        else {
            console.log('furniture added : ' + advertisement);
            res.redirect('/furniture?msg=' + "Furniture Added");
        }
    });
});

//Delete A Advertisement
router.get('/furniture/delete/:id', isLoggedIn, function (req, res) {
    var id = req.params.id;
    advertisements.deleteOne({ _id: id }, function (err) {
        console.log(id);
        if (err)
            console.log('Furniture : ' + id + 'not found!');
        else
            res.redirect('/furniture');
    });
});


//Edit A Product Page
router.get('/furniture/edit/:id', isLoggedIn, function (req, res) {
    var id = req.params.id;

    advertisements.findById(id, function (err, product) {
        if (err)
            res.send('Furniture : ' + id + 'not found!');
        else
            res.render('editfurniture', { advertisement: product });
    });
});

//Edit a Advertisement and save to DB
router.post('/furniture/edit', isLoggedIn, function (req, res) {
    var id = req.body.id;
    var editedAdvertisment = {
        _id: id,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
    };
    advertisements.updateOne({ _id: id }, editedAdvertisment, function (err) {
        if (err) res.send('Furniture: ' + id + ' not found!');
        else {
            console.log('Furniture' + id + ' updated!');
            res.redirect('/furniture');
        }
    });

});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log('Not authenticated!');
    res.redirect('/signin');
}

module.exports = router;