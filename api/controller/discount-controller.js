const DiscountModel = require('../models/discount-model');
const {Discount} = require('../utilities/classes');
const {generateRandomCode} = require('../utilities/functions');



async function addDiscountCode(req, res){
    let discount = req.body;
    let newDiscount = new Discount(discount.seller_creator, generateRandomCode(),discount.category, discount.percent, discount.time, discount.number_uses);
    let insertedDiscount = await DiscountModel.insertDiscount(newDiscount);
    if(insertedDiscount !== -1){
        return res.send(JSON.stringify("ok"));
    }
   res.send(JSON.stringify(null));
}





module.exports = {
    addDiscountCode,
}