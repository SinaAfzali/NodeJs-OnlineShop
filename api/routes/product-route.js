var express = require('express');
var router = express.Router();
router.use(express.json());
var {addProduct, getFilteredProducts, getOneProduct, getCartProducts, check_rating,submit_rating,getSellerProducts,change_status,update_product,} = require('../controller/product-controller');



// router.use(PostRequest);
router.post('/add', addProduct);
router.post('/change/status', change_status);
router.post('/update', update_product);
router.post('/get/filter', getFilteredProducts);
router.post('/get/one', getOneProduct);
router.post('/getSellerProducts', getSellerProducts);
router.post('/cart/get', getCartProducts);
router.post('/rating/check', check_rating);
router.post('/rating/submit', submit_rating);


module.exports = router;