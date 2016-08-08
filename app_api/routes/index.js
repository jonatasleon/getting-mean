var express = require('express');
var router = express.Router();

router.use('/locations', require('./locations'));

module.exports = router;
