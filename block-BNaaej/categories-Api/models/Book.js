var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bookSchema = new Schema({
    title:{type:String,required:true},
    summary:String,
    pages:Number,
    publication:String,
    cover_image:String,
    category:String,
    author:Object
},{timestamps:true})

module.exports = mongoose.model("Book",bookSchema);