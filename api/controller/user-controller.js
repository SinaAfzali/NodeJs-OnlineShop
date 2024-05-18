const {existUser, createUser} = require('../models/user-model');


class User{
    constructor(userName, password){
        this.userName = userName;
        this.password = password;
    }
}


const userValidator = async function(req, res) {
    let result = await existUser(String(req.body.userName));
    if(result){
      res.send(JSON.stringify("user already exist"));
    }else res.send(JSON.stringify("ok"));
  
}

const registerUser = async function(req,res){
    let result = await existUser(String(req.body.userName));
    if(result){
        return res.send(JSON.stringify("user already exist"));
      }else {
        let user = await createUser(new User(String(req.body.userName), String(req.body.password)));
        console.log('user', user);
        if(user !== null)return res.send(JSON.stringify("ok"));
        else return res.send(JSON.stringify("not ok"));
    }

}

const loginUser = async function(req, res){
    res.send("ok");
}
module.exports = {userValidator, registerUser, loginUser};