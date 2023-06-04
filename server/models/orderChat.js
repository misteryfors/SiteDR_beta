const {Schema, model, ObjectId} = require("mongoose")


const OrderChat = new Schema({
    order:{type:ObjectId,ref:'Order'},
    firstUser:{type:ObjectId, ref:'User'},
    firstUserName:{type: String},
    secondUser:{type:ObjectId, ref:'User'},
    secondUserName:{type: String},
    chekFirstUser:{type:Boolean},
    chekSecondUser:{type:Boolean}
})

module.exports = model('OrderChat', OrderChat)