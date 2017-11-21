var mongoose = require('mongoose');
var Employee = mongoose.model('Employee',{
    name:{
        type:String,
        required:true,
        trim:true,
        minLength:3
    },
    access:{
        type:[String],
        trim:true,
        default:null
    },
    dept:{
        type:String,
        trim:true,
        minLength:2
    }
});
module.exports = {Employee};