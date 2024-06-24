const ProductsModel = require('../models/product-model');
const TransactionModel = require('../models/transaction-model');
const {Product} = require('../utilities/classes');
const {newest_products, cheapest_products, moreExpensive_products, filterByCategory_products} = require('../utilities/functions');
const { ObjectId } = require('mongodb'); 



class ProductsController{

  static async addProduct(req,res){
    let obj = req.body;
    var product = new Product(obj.name,Number(obj.price),obj.description,Number(obj.productNumber), 
      obj.image,obj.filter,Number(obj.discount),obj.features, Product.status_dontdisplay, obj.seller_id, 0, 0);
    let result = await ProductsModel.insertProduct(product);
    if(result !== -1){
      return res.send(JSON.stringify(true));
    }
    res.send(JSON.stringify(null));
    
}

 static async getFilteredProducts(req,res){
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

  if (products.length === 0) products = [];
  
  const jsonProducts = JSON.stringify(products, replacer, 2);  
  res.send(jsonProducts);
}

static async  getOneProduct(req,res){
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


static async getCartProducts(){
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


static async check_rating(req,res){
  let transactions = await TransactionModel.getTransactions();
  for(let i=0;i<transactions.length;i++){
    if(transactions[i].customer_id === req.body.userName){
        for(let j=0;j<transactions[i].products_list.length;j++){
            if(String(req.body.product_id) === transactions[i].products_list[j].product_id){
                return res.send(JSON.stringify(true));
            }
        }
    }
}
res.send(JSON.stringify(false));
}

static async submit_rating(req,res){
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

static async getSellerProducts(req,res){
  let products = await ProductsModel.getProducts();
  let filtered_products = [];
  for(let i=0;i<products.length;i++){
    if(products[i].seller_id === req.body.userName){
      filtered_products.push(products[i]);
    }
  }
  res.send(JSON.stringify(filtered_products));
}

static async change_status(req, res){
   let update = await ProductsModel.updateProduct(req.body.product_id, {status: req.body.status}, 'set');
   if(update)res.send(JSON.stringify(true));
   else res.send(JSON.stringify(false));
}

static async update_product(req,res){
  let id = req.body._id;
  let obj = req.body;
  var product = new Product(obj.name,Number(obj.price),obj.description,Number(obj.productNumber), 
      obj.image,obj.filter,Number(obj.discount),obj.features, Product.status_dontdisplay, obj.seller_id, obj.total_scores, obj.number_scores);
    console.log(id);
  let update = await ProductsModel.updateProduct(id, product,'set');
  if(update)return res.send(JSON.stringify(true));
  res.send(JSON.stringify(false));
}


static async remove_product(req,res){
  let deleted = await ProductsModel.deleteProduct(req.body._id);
  if(deleted)return res.send(JSON.stringify(true));
  res.send(JSON.stringify(false));
}


}

module.exports = ProductsController;