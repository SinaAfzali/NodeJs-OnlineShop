var express = require('express');
var router = express.Router();
router.use(express.json());
const {addComment} = require('../controller/comment-controller');


router.post('/add', addComment);



module.exports = router;