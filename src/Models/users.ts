import mongoose = require('mongoose');

var Schema = mongoose.Schema

var User = new Schema({
    name : {
        type:String,
        required:true,
        minlength:1,
        trim:true
    },
    password : {
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
