

class Url{
    static root = "http://localhost:9000/";
    
    static register_url = this.root + "api/user/register";

    static login_url = this.root + "api/user/login";

    static tokenLogin_url = this.root + "api/user/login/token";

}


module.exports = Url;