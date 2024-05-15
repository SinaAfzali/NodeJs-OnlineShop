
module.exports = function PostRequest(req,res,next){
    if(req.header("Access-Control-Allow-Origin") === 'http://localhost:3000')next();
    else throw console.error("access invalid!");
}