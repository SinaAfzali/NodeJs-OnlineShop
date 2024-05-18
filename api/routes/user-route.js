var express = require('express');
var router = express.Router();
const {userValidator, emailsender} = require('../controller/user-controller')

/* GET users listing. */
router.post('/register/username/validator',userValidator);
router.post('/register/email/sendCode', emailsender);
router.post('/register/email/validator', emailsender);

module.exports = router;
