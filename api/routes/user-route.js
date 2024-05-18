var express = require('express');
var router = express.Router();
const {userValidator, emailsender} = require('../controller/user-controller')

/* GET users listing. */
router.post('/username/validator',userValidator);
router.post('/email/sendCode', emailsender);
router.post('/email/validator', emailsender);

module.exports = router;
