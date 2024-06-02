

const TransactionModel = require('../models/transaction-model');
const {Transaction} = require('../utilities/classes'); 


async function addTransaction(req, res){
    let transaction = await TransactionModel.insertTransaction(req.body);
    res.send(JSON.stringify(transaction));
}

async function getTransactions(req, res){
    let transactions = await TransactionModel.getTransactions();
    res.send(JSON.stringify(transactions));
}

async function getTransactionsByCustomerId(req, res){
    let transactions = await TransactionModel.getTransactions();
    let filtered_transactions = [];
    let k = 0;
    let customer_id = String(req.body.customer_id);
    for(let i=0;i<transactions.length;i++){
        if(transactions[i].customer_id === customer_id){
            filtered_transactions[k] = transactions[i];
            k++;
        }
    }
    res.send(JSON.stringify(filtered_transactions));
}

async function getTransactionsBySellerId(req,res){
    let transactions = await TransactionModel.getTransactions();
    let filtered_transactions = [];
    let k = 0;
    for(let i=0;i<transactions.length;i++){
       let sellers_id = Transaction.reformat(transactions[i].sellers_id);
       let prooducts_list = Transaction.reformat(transactions[i].prooducts_list);
       let numberProducts_list = Transaction.reformat(transactions[i].numberProducts_list);
       let seller_id = String(req.body.seller_id);
       let list_products_current_seller = [];
       let list_numberProducts_current_seller = [];
       let x = 0;
       for(let j=0;j<sellers_id.length;j++){
        if(sellers_id[j] === seller_id){
            list_products_current_seller[x] = prooducts_list[j];
            list_numberProducts_current_seller[x] = numberProducts_list[j];
            x++;
        }
       }
       if(list_products_current_seller.length !== 0){
            let newTransaction = new Transaction(transactions[i].customer_id, list_products_current_seller, 
                list_numberProducts_current_seller, seller_id);
                newTransaction.setID(transactions[i]._id);
            filtered_transactions[k] = newTransaction;
            k++;    
       }
    }

    res.send(JSON.stringify(filtered_transactions));
}

module.exports = {
    addTransaction,
    getTransactions,
    getTransactionsBySellerId,
    getTransactionsByCustomerId
}
