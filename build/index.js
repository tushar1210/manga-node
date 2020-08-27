"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./Routers/user"));
const manga_1 = __importDefault(require("./Routers/manga"));
const mangasee123_1 = require("./Scrapper/mangasee123");
const node_cron_1 = __importDefault(require("node-cron"));
require('dotenv').config();
mongoose_1.default.Promise = global.Promise;
const PORT = process.env.PORT || 5000;
const app = express_1.default();
const mangasee123sc = new mangasee123_1.scraper();
app.set('json spaces', 4);
app.use('/user', user_1.default);
app.use('/manga', manga_1.default);
app.use("/", (request, response) => {
    response.sendFile(__dirname + '/Routers/index.html');
});
const connString = String(process.env.CONNECTION_STRING);
mongoose_1.default.connect(connString, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
});
app.listen(PORT, () => {
    console.log("Server's on @" + PORT);
    node_cron_1.default.schedule('0 0 0 * * *', () => {
        mangasee123sc.all();
    });
});
//# sourceMappingURL=index.js.map