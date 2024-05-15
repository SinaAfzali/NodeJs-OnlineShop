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

  const productFeatures = [];
  for (let i = 0; i < features.length; i++) {
    productFeatures.push([features[i].name, features[i].value]);
  }

  const product = new Product(name, price, description, productNumber, image, filter, discount, productFeatures);

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  };

  fetch(apiUrl, requestOptions)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('خطا در ارسال درخواست:', error));
};

module.exports.addProduct = addProduct;