const Database = require('../utilities/db_mongo');
const {myDate} = require('../utilities/classes');

const collection_name = 'comments';

class CommentsModel{
    static async insertComment(product_id, name, text){
        let comment = await Database.insertDocument(collection_name, {product_id:product_id, name:name, text:text, date_add: myDate.now()});
        return comment;
    }

    static async getComments(){
        let comments = await Database.getDocuments(collection_name);
        return comments;
    }
}



module.exports = CommentsModel;