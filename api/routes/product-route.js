var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send([{name:"sina", age:25},]);
});

module.exports = router;