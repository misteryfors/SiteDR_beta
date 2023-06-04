const {Schema, model, ObjectId} = require("mongoose")


const Review = new Schema({
    userName:{type:String},
    liked:{type:Boolean},
    date:{type: Date },
    deleted:{type:Boolean},
    review:{type: String }
})

module.exports = model('Review', Review)