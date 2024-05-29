const Database = require('../utilities/db_mongo');
const {Date} = require('../utilities/classes')


class ProductsModel{
    static async getProducts(){
        let products = await Database.getDocuments("products");
        return products;
    }

    static getProduct(id){
    }

    static updateProduct(id, newProduct, set_or_unset){
       
    }

    static async insertProduct(product){
        let result = await Database.insertDocument("products", Object.assign({}, product, {date_add: Date.now()}));
        return result;
    }

    static deleteProduct(id){

    }
    
}


module.exports = {ProductsModel};