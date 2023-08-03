const {Schema, model} = require("mongoose")


const Coupon = new Schema({
    name:{type: String },
    img:{type: String },
    price:{type: Number },
    description:{type: String }
})

module.exports = model('Coupon', Coupon)