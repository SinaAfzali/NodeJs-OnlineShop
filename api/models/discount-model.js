const Database = require('../utilities/db_mongo');


let collection_name = "discountes";

class DiscountModel{
    static async insertDiscount(discount){
        let discount = await Database.discount(collection_name, Object.assign({}, discount, {time_add: (new Date().getTime() / 3600000)}));
        return discount;
    }

    static async getDiscountes(){
        let discountes = await Database.getDocuments(collection_name);
        return discountes; 
    }
}


module.exports = DiscountModel;