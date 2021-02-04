var express = require('express');
var router = express.Router();

router.get('/cookies', function(req, res, next) {
    res.cookie("message", 'hello');
    res.end('Cookie-Set');
});