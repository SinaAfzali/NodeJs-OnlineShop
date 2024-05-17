const request = require('./HTTP_REQUEST');

const apiUrl = 'http://localhost:9000/api/product/add';

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

const addProduct = (formData) => {
  const { name, price, description, productNumber, image, filter, discount, features } = formData;

  var productFeatures = "";
  for (let i = 0; i < features.length; i++) {
    productFeatures += features[i].name + "||" + features[i].value 
    if(i !== features.length-1)productFeatures+='||';
  }

  const product = new Product(name, price, description, productNumber, image, filter, discount, productFeatures);

  request.Post(apiUrl, product);
  
};

module.exports.addProduct = addProduct;