const Database = require('../utilities/db_mongo');
const {Date} = require('../utilities/classes');

const collection_name = 'comments';

class CommentsModel{
    static async insertComment(product_id, name, text){
        let comment = await Database.insertDocument(collection_name, {product_id:product_id, name:name, text:text, date_add: Date.now()});
        return comment;
    }
}



module.exports = CommentsModel;