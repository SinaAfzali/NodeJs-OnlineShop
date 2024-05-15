var express = require('express');
var router = express.Router();
router.use(express.json());
var productController = require('../controller/product-controller');
// const PostRequest = require('../middleware/PostRequest');


// router.use(PostRequest);
router.post('/add', productController.productController);

module.exports = router;