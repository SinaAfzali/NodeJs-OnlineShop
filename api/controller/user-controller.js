const UserModel = require('../models/user-model');
const bcrypt = require("bcrypt");
const { use } = require('../routes/user-route');
const { json } = require('express');

const jwt = require("jsonwebtoken");

const SEKRET_KEY = 'onlineshop';



class User{
    constructor(userName, password){
        this.userName = userName;
        this.password = password;
        this.role = 'customer';
    }
}


class UserController{
    static async userValidator(req, res) {
        let result = await UserModel.existUser(String(req.body.userName));
        if(result){
          res.send(JSON.stringify("user already exist"));
        }else res.send(JSON.stringify("ok"));
    };

    static async registerUser(req,res){
        let result = await UserModel.existUser(String(req.body.userName));
        if(result){
            return res.send(JSON.stringify("user already exist"));
          }else {
            const hashPassword = await bcrypt.hash(String(req.body.password), 10);
            let user = await UserModel.createUser(new User(String(req.body.userName),hashPassword));
            if(user !== null){
                return res.send(JSON.stringify("ok"));
            }
            else return res.send(JSON.stringify(null));
        }
    };
    static async loginUser(req, res){
        let result = await UserModel.existUser(String(req.body.userName));
        if(result){
            const user = await UserModel.getUser(String(req.body.userName));
            const validPassword = await bcrypt.compare(String(req.body.password), user.password);
            if(validPassword)return res.send(JSON.stringify(user));
            res.send(JSON.stringify(null));
        }else return res.send(JSON.stringify(null));
    }

    static async sendToken(req,res){
        const token = jwt.sign({userName : String(req.body.userName)} , SEKRET_KEY);
        res.send(JSON.stringify(String(token)));
    }
}

module.exports = UserController;