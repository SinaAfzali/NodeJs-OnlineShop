const CommentsModel = require('../models/comment-model');


async function addComment(req,res) {
    let comment = await CommentsModel.insertComment(req.body.product_id, req.body.name, req.body.text);
    if(comment)return res.send(JSON.stringify(true));
    res.send(JSON.stringify(false));
}



module.exports = {addComment,};