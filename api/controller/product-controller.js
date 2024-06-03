const { json } = require('express');
const {ProductsModel} = require('../models/product-model');
const {Product} = require('../utilities/classes');
const {newest_products, cheapest_products, moreExpensive_products, filterByCategory_products} = require('../utilities/functions');
const { ObjectId } = require('mongodb'); 



async function addProduct(req,res){
    let obj = req.body;
    var product = new Product(obj.name,Number(obj.price),obj.description,Number(obj.productNumber), 
      obj.image,obj.filter,Number(obj.discount),obj.features, Product.status_available, obj.seller_id, 0, 0);
    let result = await ProductsModel.insertProduct(product);
    if(result !== -1){
      return res.send(JSON.stringify("ok"));
    }
    res.send(JSON.stringify(null));
    
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

  const replacer = function(key, value) {   
    if (value instanceof ObjectId) {   
      return value.toString();   
    } else {   
      return value;   
    }   
  };  
  
const jsonProducts = JSON.stringify(products, replacer, 2);  
  res.send(jsonProducts);
}

async function getOneProduct(){
  let product = await ProductsModel.getProduct(String(req.body._id));
  return product;
}


async function getCartProducts(){
  let cart_products = req.body;
  let total_price = 0;
  let products = await ProductsModel.getProducts();
  let result = [];
  let k = 0;
  for(let i=0;i<cart_products.length;i+=2){
    for(let j=0;j<products.length;j++){
       if(cart_products[i] === products[j]._id){
        result[k] = products[j];
        k++;
        total_price += Number(cart_products[i+1]) * products[j].price;
        break;
      }
    }
  }
  result[k] = {total_price: total_price};
  res.send(JSON.stringify(result));
}

module.exports = {addProduct, getFilteredProducts, getOneProduct, getCartProducts};