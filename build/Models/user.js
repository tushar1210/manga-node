"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let user = new Schema({
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
        trim: true,
    },
    favourities: {
        type: [String],
        required: false
    }
});
exports.User = mongoose.model('User', user);
//# sourceMappingURL=user.js.map