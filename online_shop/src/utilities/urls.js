

class Url{
    static root = "http://localhost:9000/";
    
    static register_url = this.root + "api/user/register";

    static user_update_url = this.root + "api/user/profile/update";

    static get_user_info = this.root + "api/user/getInfo";

    static login_url = this.root + "api/user/login";

    static tokenLogin_url = this.root + "api/user/login/token";

    static tokenValidator = this.root + "api/user/login/token/validator";

    static getFilterdProducts_url = this.root + "api/product/get/filter";

    static addProduct_url = this.root + "api/product/add";

    static delete_product_url = this.root + "api/product/delete";

    static update_product = this.root + "api/product/update";

    static change_status_product = this.root + "api/product/change/status";

    static getOneProduct_url = this.root + "api/product/get/one";

    static check_rating = this.root + "api/product/rating/check";

    static submit_rating = this.root + "api/product/rating/submit"

    static getSellerProducts = this.root + "api/product/getSellerProducts";

    static add_comment = this.root + "api/comment/add";

    static get_comments = this.root + "api/comment/get";

    static get_transaction = this.root + "api/transaction/getOne";

    static add_transaction = this.root + "api/transaction/add";

    static remove_transaction = this.root + "api/transaction/removeOne";

    static update_transaction = this.root + "api/transaction/update";

    static get_Transaction_seller = this.root + "api/transaction/get/filter/seller";

    static get_Transaction_customer = this.root + "api/transaction/get/filter/customer";

}


module.exports = Url;