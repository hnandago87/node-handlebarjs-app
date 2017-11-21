var mongoose = require('mongoose');
var Department = mongoose.model('Department',{
    name:{
        type:String,
        required:true,
        trim:true,
        minLength:2
    }
});
module.exports = {Department};