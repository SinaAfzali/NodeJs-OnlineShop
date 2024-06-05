

class Url{
    static root = "http://localhost:9000/";
    
    static register_url = this.root + "api/user/register";

    static login_url = this.root + "api/user/login";

    static tokenLogin_url = this.root + "api/user/login/token";

    static tokenValidator = this.root + "api/user/login/token/validator";

    static getFilterdProducts_url = this.root + "api/product/get/filter";

    static addProduct_url = this.root + "api/product/add";

    static getOneProduct_url = this.root + "api/product/get/one"

}


module.exports = Url;