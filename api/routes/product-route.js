var express = require('express');
var router = express.Router();
router.use(express.json());
var {addProduct, getFilteredProducts, getOneProduct} = require('../controller/product-controller');



// router.use(PostRequest);
router.post('/add', addProduct);
router.post('/get/filter', getFilteredProducts);
router.post('/get/one', getOneProduct);

module.exports = router;