const { json } = require('express');
const {ProductsModel} = require('../models/product-model');
const {Product} = require('../utilities/classes');
const {newest_products, cheapest_products, moreExpensive_products, filterByCategory_products} = require('../utilities/functions');




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

async function getFilteredProducts(req,res){
  let products = await ProductsModel.getProducts();
  if(req.body.filter1 !== 'همه محصولات'){
    products = filterByCategory_products(products, req.body.filter1);
  }

  if(req.body.filter2 === 'ارزان ترین'){
    products = cheapest_products(products);
  }else if(req.body.filter2 === 'گران ترین'){
    products = moreExpensive_products(products);
  }else if (req.body.filter2 === 'جدید ترین'){
    products = newest_products(products);
  }


  res.send(products);
}

module.exports = {addProduct, getFilteredProducts};