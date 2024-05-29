var express = require('express');
var router = express.Router();
const UserController = require('../controller/user-controller')


router.post('/register/username/validator',UserController.userValidator);

router.post('/register', UserController.registerUser);

router.post('/login', UserController.loginUser);

router.post('/login/token', UserController.sendToken);

router.post('/login/token/validator', UserController.tokenValidator);

module.exports = router;
