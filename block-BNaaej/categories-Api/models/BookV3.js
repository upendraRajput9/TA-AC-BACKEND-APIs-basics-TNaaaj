var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bookV3Schema = new Schema({
    title:{type:String,required:true},
    summary:String,
    pages:Number,
    publication:String,
    cover_image:String,
    category:[String],
    tags : [String],
    author:Object,
    comment:[{type: Schema.Types.ObjectId , ref:"Comment"}],
},{timestamps:true})

module.exports = mongoose.model("BookV3",bookV3Schema);