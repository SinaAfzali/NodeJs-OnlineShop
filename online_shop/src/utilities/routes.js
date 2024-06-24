class Router_path {

  static root = "/";

  static loginAndRegister = '/loginAndRegister';

  static cart = '/cart';

  static creator = '/creator';

  static sellerAcount = '/user/seller/account';

  static CustomerAccount = '/user/customer/acount';

  static addProduct = '/user/seller/account/product/add';

  static showProduct = '/showProduct/:id';

  static PaymentForm = '/pay/:id';
  
  static changeProduct = '/changeProduct/:id'; // Add this line for changeProduct
}

module.exports = Router_path;
