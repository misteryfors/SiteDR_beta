const {Schema, model, ObjectId} = require("mongoose")


const OrderMessage = new Schema({
    user:{type:ObjectId, ref:'User'},
    date:{type: Date },
    message:{type: String },
    chat:{type:ObjectId, ref:'OrderChat'},
    chek:{type:Boolean}
})

module.exports = model('OrderMessage', OrderMessage)