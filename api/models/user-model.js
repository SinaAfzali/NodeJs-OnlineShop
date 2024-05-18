const {getDocument, insertDocument} = require('../utilities/db_mongo');


const existUser = async function(userName){
    let result = await getDocument('users', {userName : userName});
    if(result !== -1){
        return true;
      }else return false;
};

const createUser = async function(user){
    let result = await existUser(user.userName);
    if(result){
        return null;
    }else {
        let result = await insertDocument('users', user);
        return result;
    }
}


module.exports = {existUser, createUser};