import mongoose = require('mongoose');

var Schema = mongoose.Schema

var user = new Schema({
    id : {
        type:String,
        required:true,
        minlength:1,
        trim:true,
        unique:true
    },
    pass : {
        type:String,
        required:true,
        minlength:1,
        trim:true,
    },
    favourities: {
        type:[String],
        required : false 
    }
});
export var User = mongoose.model('User',user) ;