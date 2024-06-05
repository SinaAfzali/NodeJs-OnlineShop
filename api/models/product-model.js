const Database = require('../utilities/db_mongo');
const {Date} = require('../utilities/classes');
const { ObjectId } = require('mongodb');


const colletion_name = "products";

class ProductsModel{
    static async getProducts(){
        let products = await Database.getDocuments(colletion_name);
        return products;
    }

    static async getProduct(product_id){
        let product = await Database.getDocument(colletion_name, {_id : new ObjectId(product_id)});
        return product;
    }

    static updateProduct(id, newProduct, set_or_unset){
       
    }

    static async insertProduct(product){
        let result = await Database.insertDocument(colletion_name, Object.assign({}, product, {date_add: Date.now()}));
        return result;
    }

    static deleteProduct(id){

    }
    
}


module.exports = {ProductsModel};