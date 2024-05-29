var express = require('express');
var router = express.Router();
router.use(express.json());
var {addProduct, getProducts} = require('../controller/product-controller');



// router.use(PostRequest);
router.post('/add', addProduct);
router.get('/getProducts', getProducts);

module.exports = router;