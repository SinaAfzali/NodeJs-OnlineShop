const ProductsModel = require('../models/product-model');
const TransactionModel = require('../models/transaction-model');
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

async function getOneProduct(req,res){
  let product = await ProductsModel.getProduct(String(req.body.product_id));
  const replacer = function(key, value) {   
    if (value instanceof ObjectId) {   
      return value.toString();   
    } else {   
      return value;   
    }   
  };  
  const jsonProduct = JSON.stringify(product, replacer, 2);  
  res.send(jsonProduct);
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


async function check_rating(req,res){
  let transactions = await TransactionModel.getTransactions();
  for(let i=0;i<transactions.length;i++){
    if(transactions[i].customer === req.body.userName){
        for(let j=0;j<transactions[i].products_list.length;j++){
            if(req.body.product_id === transactions[i].products_list[j]._id){
                return res.send(JSON.stringify(true));
            }
        }
    }
}
res.send(JSON.stringify(false));
}

async function submit_rating(req,res){
    let product = await ProductsModel.getProduct(req.body.product_id);
    if(product.Scorers){
      for(let i=0;i<product.Scorers.length;i++){
        if(product.Scorers[i] === req.body.userName){
          return res.send(JSON.stringify(false));
        }
      }
    }
    let list = product.Scorers;
    if(!list)list = [];
    list.push(req.body.userName);
    product.Scorers = list;
    product.total_scores += Number(req.body.score);
    product.number_scores += 1;
    let update = await ProductsModel.updateProduct(product._id, product, 'set');
    return res.send(JSON.stringify(true));
}

module.exports = {addProduct, getFilteredProducts, getOneProduct, getCartProducts, check_rating,submit_rating,};