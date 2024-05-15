const productModel = require('../models/product-model');

function productController(req,res){
    // productModel.insertProduct(req.body);
    res.send(JSON.stringify("ok"));
}

module.exports.productController = productController;