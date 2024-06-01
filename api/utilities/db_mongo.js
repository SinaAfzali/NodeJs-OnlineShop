const { log } = require('console');
const {MongoClient} = require('mongodb');
const { normalize } = require('path');
require("dotenv").config();

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
const my_db = "SHOP";

class Database{
    static async createCollection(collection_name){
        if(process.env.STATUS === "development"){
            try {
                await client.connect();
                var database = client.db(my_db);
                var findCollection = (await database.listCollections({name: collection_name}).toArray()).length;
                if(findCollection === 0){
                    let result = await database.createCollection(collection_name);
                    return result;
                }
                return "collection already exist!";
         
            } catch (e) {
                console.error(e);
            } 
            // finally {
            //     await client.close();
            // }
        }
        else return "no access to this opration!";
    };


    static async dropCollection(collection_name){
        if(process.env.STATUS === "development"){
            try {
                await client.connect();
                var database = client.db(my_db);
                var findCollection = (await database.listCollections({name: collection_name}).toArray()).length;
                if(findCollection === 1){
                    let result = await database.dropCollection(collection_name);
                    return result;
                }
                return "collection already exist!";
         
            } catch (e) {
                console.error(e);
            } 
            // finally {
            //     await client.close();
            // }
        }
        else return "no access to this opration!";
    };
    

    static async insertDocument(collection_name, document){
        try {
            await client.connect();
            var database = client.db(my_db);
            var findCollection = (await database.listCollections({name: collection_name}).toArray()).length;
            if(findCollection === 1){
            let collection = database.collection(collection_name);
            let result = await collection.insertOne(document);
            return result;
            }else return "collection does not exist!";
     
        } catch (e) {
            console.error(e);
        } 
        // finally {
        //     await client.close();
        // }
    };


static async deleteDocument(collection_name, document, one_or_many){
        try {
            await client.connect();
            var database = client.db(my_db);
            var findCollection = (await database.listCollections({name: collection_name}).toArray()).length;
            if(findCollection === 1){
            let collection = database.collection(collection_name);
            if (one_or_many === "one"){
                var result = await collection.deleteOne(document);
            }else if(one_or_many === "many"){
            var result = await collection.deleteMany(document);
            }else return "one_or_many is invalid";
            return result;
            }
            else return "collection does not exist!";
     
        } catch (e) {
            console.error(e);
        } 
        // finally {
        //     await client.close();
        // }
    };



    static async updateDocument(collection_name, document, updated_document, set_or_unset){
        try {
            await client.connect();
            var database = client.db(my_db);
            var findCollection = (await database.listCollections({name: collection_name}).toArray()).length;
            if(findCollection === 1){
            let collection = database.collection(collection_name);
            if (set_or_unset === "set"){
                var result = await collection.updateOne(document, { $set: updated_document });
            }else if(set_or_unset === "unset"){
                var result = await collection.updateOne(document, { $unset: updated_document });
            }else return "one_or_many is invalid";
            return result;
        }else return "collection does not exist!";
     
        } catch (e) {
            console.error(e);
        } 
        // finally {
        //     await client.close();
        // }
    };


    static async getDocument(collection_name, document){
        try {
            await client.connect();
            var database = client.db(my_db);
            var findCollection = (await database.listCollections({name: collection_name}).toArray()).length;
            if(findCollection === 1){
                let collection = database.collection(collection_name);
                let findUser = await collection.findOne(document);
                if(findUser !== null)return findUser;
                else return -1;
          }else return "collection does not exist!";
     
        } catch (e) {
            console.error(e);
        } 
        // finally {
        //     await client.close();
        // }
    };
    

    static async getDocuments(collection_name){
        try {
            await client.connect();
            var database = client.db(my_db);
            var findCollection = (await database.listCollections({name: collection_name}).toArray()).length;
            if(findCollection === 1){
                let collection = database.collection(collection_name);
                let documents = await collection.find({}).toArray(); 
                return documents;
          }else return "collection does not exist!";
     
        } catch (e) {
            console.error(e);
        } 
        // finally {
        //     await client.close();
        // }
    };

}
   




module.exports = Database;
