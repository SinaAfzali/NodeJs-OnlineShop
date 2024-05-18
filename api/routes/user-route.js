var express = require('express');
var router = express.Router();
const {userValidator, emailsender} = require('../controller/user-controller')

/* GET users listing. */
router.post('/username/validator',userValidator);
router.post('/email/send', emailsender);

module.exports = router;
