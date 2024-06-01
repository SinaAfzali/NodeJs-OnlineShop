var express = require('express');
var router = express.Router();
router.use(express.json());
var {addProduct, getFilteredProducts} = require('../controller/product-controller');



// router.use(PostRequest);
router.post('/add', addProduct);
router.post('/get/filter', getFilteredProducts);

module.exports = router;