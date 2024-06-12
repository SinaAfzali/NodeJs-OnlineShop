const { ObjectId } = require('mongodb'); 
const TransactionModel = require('../models/transaction-model');
const {Transaction} = require('../utilities/classes'); 
const {myDate} = require('../utilities/classes')


async function addTransaction(req, res){
    let transactions = await TransactionModel.getTransactions();
    let now = Number((new Date().getTime() / 1000).toFixed(0));
    for(let i=0;i<transactions.length;i++){
        if((now - transactions[i].time_start) > 600 && transactions[i].status !== "paid")TransactionModel.deleteTransaction(transactions[i]._id);
    }

    let transaction = await TransactionModel.insertTransaction(req.body);
    if(transaction){
        const replacer = function(key, value) {   
            if (value instanceof ObjectId) {   
              return value.toString();   
            } else {   
              return value;   
            }   
          };  
          
          const jsonTransaction = JSON.stringify(transaction, replacer, 2);  
        return res.send(jsonTransaction);
    }
   res.send(JSON.stringify(null));
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

async function getTransaction(req, res){
    if(req.body.transaction_id.length !== 24)return res.send(JSON.stringify(false));
    let transaction = await TransactionModel.getTransaction(req.body.transaction_id);
    if(transaction !== null)return res.send(JSON.stringify(transaction));
    res.send(JSON.stringify(false));
}

async function removeTransaction(req,res){
    let transaction = await TransactionModel.getTransaction(req.body.transaction_id);
    if(transaction && transaction.status === "Awaiting Payment"){
        await TransactionModel.deleteTransaction(req.body.transaction_id);
    }
    res.send(JSON.stringify(true));
}

async function updateTransaction(req, res){
    let update = await TransactionModel.updateTransaction(req.body._id, {status:"paid", date_paid: myDate.now()});
    if(update)return res.send(JSON.stringify(true));
    res.send(JSON.stringify(false));
}

module.exports = {
    removeTransaction,
    addTransaction,
    getTransactions,
    getTransactionsBySellerId,
    getTransactionsByCustomerId,
    getTransaction,
    updateTransaction,
}