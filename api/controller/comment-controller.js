const CommentsModel = require('../models/comment-model');
const {newest_comments, } = require('../utilities/functions');


async function addComment(req,res) {
    let comment = await CommentsModel.insertComment(req.body.product_id, req.body.name, req.body.text);
    if(comment)return res.send(JSON.stringify(true));
    res.send(JSON.stringify(false));
}

async function getComments(req,res){
    let comments = await CommentsModel.getComments();
    comments = newest_comments(comments);
    let selected_comments = [];
    for(let i=0;i<comments.length;i++){
        if(comments[i].product_id === req.body.product_id){
            selected_comments.push(comments[i]);
        }
    }

    res.send(JSON.stringify(selected_comments));
}



module.exports = {addComment, getComments};