var express = require('express');
var router = express.Router();

router.post('/signin', function(req, res) {
    console.log("Pin for signin");
});

router.post('/signup', function(req, res) {
    console.log("Pin for signup");
});

module.exports = router;