var express = require('express');
var router = express.Router();
router.use(express.json());
var ProductController = require('../controller/product-controller');



// router.use(PostRequest);
router.post('/add', ProductController.addProduct);

router.post('/delete', ProductController.remove_product);

router.post('/change/status', ProductController.change_status);

router.post('/update', ProductController.update_product);

router.post('/get/filter', ProductController.getFilteredProducts);

router.post('/get/one', ProductController.getOneProduct);

router.post('/getSellerProducts', ProductController.getSellerProducts);

router.post('/cart/get', ProductController.getCartProducts);

router.post('/rating/check', ProductController.check_rating);

router.post('/rating/submit', ProductController.submit_rating);


module.exports = router;