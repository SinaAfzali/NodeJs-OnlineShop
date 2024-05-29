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


module.exports = {Product, };