const {Schema, model} = require("mongoose")


const Product = new Schema({
    name:{type: String },
    type:{type: String },
    mark:{type: String },
    price:{type: Number },
    shortDescription:{type: String },
    description:{type: String },
    imgs:[{type: String }],
    publicate:{type:Boolean },
    booked:{type:Boolean},
    privateComment:{type:String},
    background:{type:String}
})

module.exports = model('Product', Product)