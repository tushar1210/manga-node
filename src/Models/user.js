"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var user = new Schema({
    id: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true
    },
    pass: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    favourities: {
        type: [String],
        required: false
    }
});
exports.User = mongoose.model('User', user);
