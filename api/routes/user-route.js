var express = require('express');
var router = express.Router();
const UserController = require('../controller/user-controller')


router.post('/register/username/validator',UserController.userValidator);

router.post('/register/form', UserController.registerUser);

router.post('/login/form', UserController.loginUser);

router.post('/login/token', UserController.sendToken);

module.exports = router;
