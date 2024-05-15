const {Database} = require('../utilities/db_mongo');

class ProductsModel{
    static getProducts(){
        
    }

    static getProduct(id){

    }

    static updateProduct(id, newProduct, set_or_unset){

    }

    static insertProduct(product){
        Database.insertDocument("products", product);
    }

    static deleteProduct(id){

    }
    
}


module.exports = ProductsModel;