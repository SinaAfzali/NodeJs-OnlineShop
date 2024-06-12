const Database = require('../utilities/db_mongo');
const {myDate} = require('../utilities/classes');
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

    static async updateProduct(id, newProduct, set_or_unset){
       let lastProduct = await this.getProduct(id); 
       let result = await Database.updateDocument(colletion_name, lastProduct, newProduct, set_or_unset);
       return result;
    }

    static async insertProduct(product){
        let result = await Database.insertDocument(colletion_name, Object.assign({}, product, {date_add: myDate.now()}));
        return result;
    }

    static deleteProduct(id){

    }
}


module.exports = ProductsModel;