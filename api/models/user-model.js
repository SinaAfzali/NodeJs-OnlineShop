const Database = require('../utilities/db_mongo');


class UserModel{
    static async existUser(userName){
        let result = await Database.getDocument('users', {userName : userName});
        if(result !== -1){
            return true;
          }else return false;
    };

    static async createUser(user){
        let result = await this.existUser(user.userName);
        if(result){
            return null;
        }else {
            let result = await Database.insertDocument('users', user);
            return result;
        }
    };

    static async getUser(userName){
        let result = await Database.getDocument('users', {userName: userName});
        if(result === -1){
            return null;
        }else {
            return result;
        }
    };
}


module.exports = UserModel;