var express = require('express');
var router = express.Router();
router.use(express.json());
const {addComment, getComments} = require('../controller/comment-controller');


router.post('/add', addComment);
router.post('/get', getComments);



module.exports = router;