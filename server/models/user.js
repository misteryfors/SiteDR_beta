const {Schema, model, ObjectId} = require("mongoose")


const User = new Schema({
    email:{type: String, required:true, unique:true},
    password:{type: String, required:true},
    role:{type: String, required:true},
    phone:{type: String},
    name:{type: String},
    telegram:{type: String},
    confirmed:{type:Boolean},
    notice:{type: String},
    coupons:[{type:ObjectId, coupon:'User'}]
})

module.exports = model('User', User)