var express = require('express');
var router = express.Router();
const {userValidator, registerUser, loginUser} = require('../controller/user-controller')


router.post('/register/username/validator',userValidator);

router.post('/register/form', registerUser);

router.post('/login/form', loginUser);

module.exports = router;
