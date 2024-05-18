const { getDocument } = require('../utilities/db_mongo');
const {existUser} = require('../models/user-model');


const userValidator = async function(req, res) {
    if(existUser(String(req.body.userName))){
      res.send(JSON.stringify("user already exist"));
    }else res.send(JSON.stringify("ok"));
  
}

const registerUser = async function(req,res){
    if(existUser(String(req.body.userName))){
        res.send(JSON.stringify("user already exist"));
      }else {
        
        res.send(JSON.stringify("ok"));
    }

}
module.exports = {userValidator, registerUser};