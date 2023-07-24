const {Schema, model, ObjectId} = require("mongoose")


const Order = new Schema({
    adress:{type: String, required:true},
    fio:{type: String, required:true},
    phone:{type:String, required:true},
    type:{type: String, required:true},
    mark:{type: String, required:true},
    timeInUse:{type: String, required:true},
    comment:{type: String, required:true},
    urgency:{type: Boolean, required:true},
    time:{type: Date, required:true},
    imgs:[{type: String }],
    user:{type:ObjectId, ref:'User'},
    chek:{type:Boolean},
    status:{type:String},
    responsible:{type:String},
    history:[{type:ObjectId}],
    master:{type:ObjectId, ref:'User'},
    createTime:{type: Date, required:true},
    privateComment:{type:String},

})

module.exports = model('Order', Order)