var express = require('express');
var router = express.Router();
router.use(express.json());


const {addTransaction} = require('../controller/transaction-controller');
const { getTransaction, getTransactionsBySellerId, getTransactionsByCustomerId } = require('../models/transaction-model');


router.post('/add', addTransaction);
router.post('/get/filter/seller', getTransactionsBySellerId);
router.post('/get/filter/customer', getTransactionsByCustomerId);