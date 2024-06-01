

class Url{
    static root = "http://localhost:9000/";
    
    static register_url = this.root + "api/user/register";

    static login_url = this.root + "api/user/login";

    static tokenLogin_url = this.root + "api/user/login/token";

    static tokenValidator = this.root + "api/user/login/token/validator";

    static getNewestProducts_url = this.root + "api/product/get/newest";

    static addProduct_url = this.root + "api/product/add"

}


module.exports = Url;