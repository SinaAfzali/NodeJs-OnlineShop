var express = require('express');
var router = express.Router();
const {userValidator} = require('../controller/user-controller')

/* GET users listing. */
router.post('/username/validator',userValidator);

module.exports = router;
