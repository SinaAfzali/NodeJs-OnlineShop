const { json } = require('express');
const productModel = require('../models/product-model');



class Product {
    constructor(name, price, description, productNumber, image, filter, discount, features) {
      this.name = name;
      this.price = price;
      this.description = description;
      this.productNumber = productNumber;
      this.image = image;
      this.filter = filter;
      this.discount = discount;
      this.features = features;
    }
  }

async function productController(req,res){
    var product = new Product(req.body.name,req.body.price,req.body.description, req.body.productNumber, 
        req.body.image,req.body.filter,req.body.discount,req.body.features);
    result = await productModel.insertProduct(product);
    console.log(result);
    res.send(JSON.stringify("ok"));
}

module.exports.productController = productController;