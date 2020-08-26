"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./Routers/user"));
const manga_1 = __importDefault(require("./Routers/manga"));
require('dotenv').config();
mongoose_1.default.Promise = global.Promise;
const PORT = process.env.PORT || 5000;
const app = express_1.default();
app.set('json spaces', 4);
app.use('/user', user_1.default);
app.use('/manga', manga_1.default);
app.use("/", (req, res) => {
    res.sendFile(__dirname + '/Routers/index.html');
});
const connString = String(process.env.CONNECTION_STRING);
mongoose_1.default.connect(connString, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
});
app.listen(PORT, () => {
    console.log("Server's on @" + PORT);
});
exports.default = mongoose_1.default;
//# sourceMappingURL=index.js.map