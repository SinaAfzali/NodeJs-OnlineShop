var express = require('express');
var router = express.Router();
router.use(express.json());


const {addTransaction, getTransactionsBySellerId, getTransactionsByCustomerId, getTransaction, removeTransaction, updateTransaction} = require('../controller/transaction-controller');


router.post('/add', addTransaction);
router.post('/getOne', getTransaction);
router.post('/removeOne', removeTransaction);
router.post('/get/filter/seller', getTransactionsBySellerId);
router.post('/update', updateTransaction);
router.post('/get/filter/customer', getTransactionsByCustomerId);


module.exports = router;