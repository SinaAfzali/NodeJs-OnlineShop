const { ObjectId } = require('mongodb'); 
const TransactionModel = require('../models/transaction-model');
const UserModel = require('../models/user-model');
const ProductModel = require('../models/product-model');
const {Transaction, Product} = require('../utilities/classes'); 
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
    for(let i=0;i<transactions.length;i++){
        if(transactions[i].customer_id === req.body.userName){
            filtered_transactions.push(transactions[i]);
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

async function getTransactionsBySellerId(req,res){
    let transactions = await TransactionModel.getTransactions();
    let filtered_transactions = [];
    if(req.body.position === 'SuperAdmin')filtered_transactions = transactions;
    else{
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
       if(products_curr.length > 0){
        let transaction_curr = new Transaction(transactions[i].customer_id, products_curr, price_curr);
        transaction_curr.setID(transactions[i]._id);
        transaction_curr.setDate(transactions[i].date_paid);
        filtered_transactions.push(transaction_curr);
       }
      }
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
    let transaction = await TransactionModel.getTransaction(req.body._id);

    for(let i=0;i<transaction.products_list.length;i++){
      // update users info
      let seller = await UserModel.getUser({userName:transaction.products_list[i].seller, role:'seller'});
      let money = seller.money;
      if(seller.position === 'Member'){
        money += Number(((95/100) * (transaction.products_list[i].price * transaction.products_list[i].number)).toFixed(0));
        let money2 = Number(((5/100) * (transaction.products_list[i].price * transaction.products_list[i].number)).toFixed(0))
        await UserModel.updateInformation({userName:transaction.products_list[i].seller, role:'seller'}, {money:money});
        let SuperAdmin = await UserModel.getUser({position: 'SuperAdmin'});
        money2 += SuperAdmin.money;
        await UserModel.updateInformation({position: 'SuperAdmin'}, {money:money2})
      }
      else {
        money += Number((transaction.products_list[i].price * transaction.products_list[i].number).toFixed(0));
        await UserModel.updateInformation({userName:transaction.products_list[i].seller, role:'seller'}, {money:money})
      }


      // update products info
      let product = await ProductModel.getProduct(transaction.products_list[i].product_id);
      let number = product.productNumber - transaction.products_list[i].number;
      if(number===0){
        let status = Product.status_unavailable;
        await ProductModel.updateProduct(product._id,{productNumber:number, status:status}, 'set')
      }else{
        await ProductModel.updateProduct(product._id, {productNumber:number},'set');
      }
    }
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