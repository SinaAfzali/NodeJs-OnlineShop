
const Database = require('../utilities/db_mongo');
const {Date} = require('../utilities/classes');


const collection_name = "transactions";

class TransactionModel{
    static async insertTransaction(transaction){
        let transaction = await Database.insertDocument(collection_name, Object.assign({}, transaction, {date_add: Date.now()}));
        return transaction;
    }

    static async getTransaction(_id){
        let transaction = await Database.getDocument(collection_name, {_id : _id});
        if(transaction != -1)return transaction;
        return null;
    }

    static async getTransactions(){
        let transactions = await Database.getDocuments(collection_name);
        return transactions;
    }
}

module.exports = TransactionModel;