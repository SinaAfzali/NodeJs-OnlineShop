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
  };


  
class Transaction{
    constructor(customer_id, products_list, numberProduct_list , sellers_list){
        this.customer_id = customer_id;
        this.products_list = products_list;
        this.numberProduct_list = numberProduct_list;
        this.sellers_list = sellers_list;
    }
    setID(_id){
      this._id = _id;
    }
    static formated(list_string) {
        let result = "";
        for(let i=0;i<list_string.length;i++){
            result += list_string[i];
            if(i !== list_string.length - 1)result += "||";
        }
        return result;
    }

    static reformat(string_formated){
        let list_string = string_formated.split("||");
        return list_string;
    }

}





module.exports = {Product, Transaction, };