var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var objSchema = new Schema({
    key : String,
    value : String,
    created_date : { type: Date, default: Date.now }
});

module.exports = mongoose.model('obj', objSchema);