var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var countrySchema = new Schema({
    name:{type:String,unique:true},
    state:[{type:Schema.Types.ObjectId,ref:'State'}],
    continent:String,
    population:Number,
    religions:[String],
    neighbouring_countires:[{type:Schema.Types.ObjectId,ref:'Countries'}],
    area:String
})

module.exports = mongoose.model('Countries',countrySchema)