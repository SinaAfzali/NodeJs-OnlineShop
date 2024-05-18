var express = require('express');
var router = express.Router();
const {userValidator, registerUser} = require('../controller/user-controller')


router.post('/register/username/validator',userValidator);

// router.post('/register/form',registerUser);

module.exports = router;
