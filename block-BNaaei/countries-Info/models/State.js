var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var stateSchema = new Schema({
    name:String,
    country:{type:Schema.Types.ObjectId,ref:'Countries'},
    population:Number,
    area:String,
    neighbouring_states:[{type:Schema.Types.ObjectId,ref:'State'}],
})

module.exports = mongoose.model('State',stateSchema)