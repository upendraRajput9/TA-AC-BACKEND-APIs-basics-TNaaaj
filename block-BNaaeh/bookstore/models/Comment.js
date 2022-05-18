var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var authorSchema = new Schema({
    commentBy:{type:String},
    content:{type:String},
},{timestamps:true})

module.exports = mongoose.model("Comment",authorSchema);