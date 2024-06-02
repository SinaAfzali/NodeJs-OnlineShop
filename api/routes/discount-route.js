var express = require('express');
var router = express.Router();
router.use(express.json());

const {addDiscountCode} = require('../controller/discount-controller');


router.post('/', addDiscountCode);