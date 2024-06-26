const Database = require('../utilities/db_mongo');


const collection_name = 'users';

class UserModel{
    static async existUser(user){
        let result = await Database.getDocument(collection_name, user);
        if(result !== -1){
            return true;
          }else return false;
    };

    static async existSeller(){
        let users = await Database.getDocuments(collection_name);
        for(let i=0;i<users.length;i++){
            if(users[i].role === 'seller')return true;
        }
        return false;
    }

    static async createUser(user){
        let result = await this.existUser({userName: user.userName, role: user.role});
        if(result){
            return null;
        }else {
            if(user.role === 'seller'){
                let exist_seller = await this.existSeller();
                if(!exist_seller)user = Object.assign({},user, {position:'SuperAdmin'});
                else user = Object.assign({},user, {position:'Member'});
            user = Object.assign({}, user, {money:0});
            }
            let result = await Database.insertDocument(collection_name, user);
            return result;
        }
    };

    static async getUser(user){
        let result = await Database.getDocument(collection_name, user);
        if(result === -1){
            return null;
        }else {
            return result;
        }
    };

    static async updateInformation(user, document){
        let user1 =  await this.getUser(user);
        let update = await Database.updateDocument(collection_name,user1,document, 'set');
        if(update)return true;
        return false;
    }
}


module.exports = UserModel;