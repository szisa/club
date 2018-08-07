var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    next();
});

module.exports = router;
