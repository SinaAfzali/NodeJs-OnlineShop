
const { ObjectId } = require('mongodb');
const Database = require('../utilities/db_mongo');


const collection_name = "transactions";

class TransactionModel{
    static async insertTransaction(transaction){
        let transaction1 = await Database.insertDocument(collection_name, Object.assign({}, transaction, {time_start: Number((new Date().getTime()/1000).toFixed(0)), status: "Awaiting Payment"}));
        return transaction1;
    }

    static async getTransaction(_id){
        let transaction = await Database.getDocument(collection_name, {_id : new ObjectId(_id)});
        if(transaction != -1)return transaction;
        return null;
    }

    static async getTransactions(){
        let transactions = await Database.getDocuments(collection_name);
        return transactions;
    }

    static async deleteTransaction(transaction_id){
        let remove =  await Database.deleteDocument(collection_name, {_id: new ObjectId(transaction_id)}, "one");
        return remove;
    }

    static async updateTransaction(id, document){
        let transaction = await this.getTransaction(id);
        let updated =  await Database.updateDocument(collection_name,transaction, document,"set");
        if(updated)return true;
        else return false;
    }
}

module.exports = TransactionModel;