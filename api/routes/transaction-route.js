var express = require('express');
var router = express.Router();
router.use(express.json());


const {addTransaction} = require('../controller/transaction-controller');


router.post('/add', addTransaction);