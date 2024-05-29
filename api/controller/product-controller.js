const { json } = require('express');
const {ProductsModel} = require('../models/product-model');



class Product {
    constructor(name, price, description, productNumber, image, filter, discount, features, status, seller_id, total_scores, number_scores) {
      this.name = name;
      this.price = price;
      this.description = description;
      this.productNumber = productNumber;
      this.image = image;
      this.filter = filter;
      this.features = features;
      this.status = status;
      this.seller_id = seller_id;
      this.total_scores = total_scores;
      this.number_scores = number_scores;
      if(discount)this.addDiscount(discount);
    }

    addDiscount(discount){
      this.discount = discount;
    }


    static status_available = "موجود";

    static status_unavailable = "ناموجود";

    static status_dontdisplay = "عدم نمایش";
  }

async function addProduct(req,res){
    let obj = req.body;
    var product = new Product(obj.name,obj.price,obj.description,obj.productNumber, 
      obj.image,obj.filter,obj.discount,obj.features, Product.status_available, obj.seller_id, 0, 0);
    result = await ProductsModel.insertProduct(product);
    res.send(JSON.stringify("ok"));
}

module.exports = {addProduct, };