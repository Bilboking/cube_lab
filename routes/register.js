var express = require('express');
var router = express.Router();
var User = require('../models/user');
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('register', { title: 'Please Register' });
});

router.post('/', function(req, res, next) {
    console.log('Register is working', req.body.username);
    let username = req.body.username;
    let password = req.body.password;
    let tempUser = new User({ username, password });
    tempUser.save().then((request) => {
        console.log("this is the req", request);
        res.render('register', { title: 'Please Register' });
    });    
});

module.exports = router;

//** passport with google register */