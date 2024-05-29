const { json } = require('express');
const {ProductsModel} = require('../models/product-model');
const {Product} = require('../utilities/classes')



async function addProduct(req,res){
    let obj = req.body;
    var product = new Product(obj.name,obj.price,obj.description,obj.productNumber, 
      obj.image,obj.filter,obj.discount,obj.features, Product.status_available, obj.seller_id, 0, 0);
    result = await ProductsModel.insertProduct(product);
    if(result.ok){
      res.send(JSON.stringify("ok"));
    }else{
      console.log("product does not add");
    }
    
}

async function getProducts(req,res){
  let products = await ProductsModel.getProducts();
  res.send(products);
}

module.exports = {addProduct, getProducts};