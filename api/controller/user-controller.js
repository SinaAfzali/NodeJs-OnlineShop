const { getDocument } = require('../utilities/db_mongo');

const userValidator = async function(req, res) {

    const result = await getDocument('users', {userName : String(req.body.userName)});
    if(result !== -1){
      res.send(JSON.stringify("user already exist"));
    }else res.send(JSON.stringify("ok"));
  
    // console.log(req.body.userName);
}

const emailsender = async function(req, res){
  
}

module.exports = {userValidator, emailsender};