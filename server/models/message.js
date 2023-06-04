const {Schema, model, ObjectId} = require("mongoose")


const Message = new Schema({
    user:{type:ObjectId, ref:'User'},
    date:{type: Date },
    order:{type: ObjectId, ref:'Order' },
    message:{type: String },
    chat:{type:ObjectId, ref:'Chat'},
    chek:{type:Boolean}
})

module.exports = model('Message', Message)