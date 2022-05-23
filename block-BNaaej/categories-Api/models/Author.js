var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var authorSchema = new Schema({
    name:{type:String,required:true},
    email:{type:String,lowercase:true},
    country:String
},{timestamps:true})

module.exports = mongoose.model("Author",authorSchema);