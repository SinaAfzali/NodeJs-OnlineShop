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
    for(let i=0;i<transactions.length;i++){
      if(transactions[i].status === 'paid'){
        let products_curr = [];  
        let price_curr = 0;
        for(let j=0;j<transactions[i].products_list.length;j++){
            if(transactions[i].products_list[j].seller === req.body.userName){
                products_curr.push(transactions[i].products_list[j]);
                price_curr += (transactions[i].products_list[j].price * transactions[i].products_list[j].number);
            }
        }
        let transaction_curr = new Transaction(transactions[i].customer_id, products_curr, price_curr);
        transaction_curr.setID(transactions[i]._id);
        transaction_curr.setDate(transactions[i].date_paid);
        filtered_transactions.push(transaction_curr);
      }
    }

    for(let i=0;i<filtered_transactions.length;i++){
        for(let j=i+1;j<filtered_transactions.length;j++){
            if((new myDate(filtered_transactions[i].date_paid).compareTo(filtered_transactions[j].date_paid)) === -1){
                let temp = filtered_transactions[i];
                filtered_transactions[i] = filtered_transactions[j];
                filtered_transactions[j] = temp;
              }
        }
    }

    const replacer = function(key, value) {   
        if (value instanceof ObjectId) {   
          return value.toString();   
        } else {   
          return value;   
        }   
      };  
      const jsonTransactions = JSON.stringify(filtered_transactions, replacer, 2);  
      res.send(jsonTransactions);
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