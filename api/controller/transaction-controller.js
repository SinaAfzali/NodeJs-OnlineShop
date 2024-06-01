

const TransactionModel = require('../models/transaction-model');



async function addTransaction(transaction){
    let transaction = await TransactionModel.insertTransaction(transaction);
    return transaction;
}

async function getTransactions(){
    let transactions = await TransactionModel.getTransactions();
    return transactions;
}
