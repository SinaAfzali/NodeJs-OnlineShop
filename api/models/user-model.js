const Database = require('../utilities/db_mongo');



class UserModel{
    static async existUser(user){
        let result = await Database.getDocument('users', user);
        if(result !== -1){
            return true;
          }else return false;
    };

    static async createUser(user){
        let result = await this.existUser({userName: user.userName, role: user.role});
        if(result){
            return null;
        }else {
            let result = await Database.insertDocument('users', user);
            return result;
        }
    };

    static async getUser(user){
        let result = await Database.getDocument('users', user);
        if(result === -1){
            return null;
        }else {
            return result;
        }
    };
}


module.exports = UserModel;