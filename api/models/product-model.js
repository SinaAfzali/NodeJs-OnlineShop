const mongo = require('../utilities/db_mongo');

class ProductsModel{
    static getProducts(){
        
    }

    static getProduct(id){

    }

    static updateProduct(id, newProduct, set_or_unset){

    }

    static async insertProduct(product){
        let result = await mongo.insertDocument("products", product);
        return result;
    }

    static deleteProduct(id){

    }
    
}


module.exports = ProductsModel;