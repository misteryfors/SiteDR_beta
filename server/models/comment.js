const {Schema, model, ObjectId} = require("mongoose")


const Comment = new Schema({
    comment:{type: String, required:true},
    time:{type: Date, required:true},
    user:{type:ObjectId},
    history:[{type:ObjectId}],
})

module.exports = model('Comment', Comment)