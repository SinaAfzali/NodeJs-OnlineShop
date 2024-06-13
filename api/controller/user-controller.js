const UserModel = require('../models/user-model');
const bcrypt = require("bcrypt");
const { use } = require('../routes/user-route');
const { json } = require('express');

const jwt = require("jsonwebtoken");

const SEKRET_KEY = 'onlineshop';



class UserController{
    static async userValidator(req, res) {
        let result = await UserModel.existUser({userName: String(req.body.userName), role: String(req.body.role)});
        if(result){
          res.send(JSON.stringify("user already exist"));
        }else res.send(JSON.stringify("ok"));
    };

    static async registerUser(req,res){
        let result = await UserModel.existUser({userName: String(req.body.userName), role: String(req.body.role)});
        if(result){
            return res.send(JSON.stringify(null));
          }else {
            const hashPassword = await bcrypt.hash(String(req.body.password), 10);
            let user = await UserModel.createUser({userName : String(req.body.userName),password : hashPassword, role: String(req.body.role)});
            if(user !== -1){
                return res.send(JSON.stringify(true));
            }
            else return res.send(JSON.stringify(null));
        }
    };
    static async loginUser(req, res){
        let result = await UserModel.existUser({userName: String(req.body.userName), role: String(req.body.role)});
        if(result){
            const user = await UserModel.getUser({userName: String(req.body.userName), role: String(req.body.role)});
            const validPassword = await bcrypt.compare(String(req.body.password), user.password);
            if(validPassword)return res.send(JSON.stringify(user));
            res.send(JSON.stringify(null));
        }else return res.send(JSON.stringify(null));
    }

    static async sendToken(req,res){
        const token = jwt.sign({userName : String(req.body.userName), role: String(req.body.role)} , SEKRET_KEY);
        res.send(JSON.stringify(String(token)));
    }

    static async tokenValidator(req, res){
        let token = String(req.body.token);
        jwt.verify(token, SEKRET_KEY, async (err, decoded) => { 
            if (err) { 
               return res.send(JSON.stringify(null))
            } else { 
                let user = await UserModel.getUser({userName: decoded.userName,role: decoded.role });
                if(user !== null){
                    return res.send({userName: user.userName, role: user.role});
                }else res.send(JSON.stringify(null));
            } 
        }); 
    }

    static async userUpdate(req,res){
        let update = await UserModel.updateInformation({userName:req.body.userName, role:req.body.role},{image:req.body.image});
        if(update)return res.send(JSON.stringify(true));
        res.send(JSON.stringify(false));
    }
    
    static async sendUserData(req,res){
        let user = await UserModel.getUser(req.body);
        if(user.image){
            res.send(JSON.stringify({image:user.image,}))
        }else res.send(JSON.stringify(null));
    }
}





// jwt.verify(cookieValue, SEKRET_KEY, (err, decoded) => {
//     if (err) {
//         console.error('خطا در تایید توکن:', err);
//     } else {
//         console.log(decoded); // اطلاعات اصلی (payload) توکن JWT
//     }
// });

module.exports = UserController;