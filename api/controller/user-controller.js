const { getDocument } = require('../utilities/db_mongo');

const my_email = 'testemail.comm';
const my_password = '455411';

const userValidator = async function(req, res) {

    const result = await getDocument('users', {userName : String(req.body.userName)});
    if(result !== -1){
      res.send(JSON.stringify("user already exist"));
    }else res.send(JSON.stringify("ok"));
  
}

const registerUser = async function(req,res){

}
module.exports = {userValidator};