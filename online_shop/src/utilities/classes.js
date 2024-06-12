class Product {
  constructor(_id,name, price, description, productNumber, image, filter, discount, features, status, seller_id, total_scores, number_scores) {
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
  };


  
class Transaction{
    constructor(customer_id, products_list, total_price){
        this.customer_id = customer_id;
        this.products_list = products_list;
        this.total_price = total_price;
    }
    setID(_id){
      this._id = _id;
    }
}





module.exports = {Product, Transaction, };