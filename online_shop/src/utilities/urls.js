

class Url{
    static root = "http://localhost:9000/";
    
    static register_url = this.root + "api/user/register";

    static login_url = this.root + "api/user/login";

    static tokenLogin_url = this.root + "api/user/login/token";

    static tokenValidator = this.root + "api/user/login/token/validator";

    static getFilterdProducts_url = this.root + "api/product/get/filter";

    static addProduct_url = this.root + "api/product/add";

    static getOneProduct_url = this.root + "api/product/get/one";

    static check_rating = this.root + "api/product/rating/check";

    static submit_rating = this.root + "api/product/rating/submit"

    static add_comment = this.root + "api/comment/add";

    static get_comments = this.root + "api/comment/get";
}


module.exports = Url;