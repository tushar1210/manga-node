"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const user_1 = __importDefault(require("./Routers/user"));
const manga_1 = __importDefault(require("./Routers/manga"));
require('dotenv').config();
mongoose.Promise = global.Promise;
const PORT = process.env.PORT || 5000;
const app = express();
app.set('json spaces', 4);
app.use('/user', user_1.default);
app.use('/manga', manga_1.default);
app.use("/", (req, res) => {
    res.sendFile(__dirname + '/Routers/index.html');
});
const connString = String(process.env.CONNECTION_STRING);
mongoose.connect(connString, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
});
app.listen(PORT, () => {
});
exports.default = mongoose;
//# sourceMappingURL=index.js.map