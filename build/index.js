"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mangasee123_1 = require("./Scrapper/mangasee123");
const manga_1 = __importDefault(require("./Routers/manga"));
const UserRoutes = __importStar(require("./Routers/user"));
const node_cron_1 = __importDefault(require("node-cron"));
const body_parser_1 = require("body-parser");
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const app = express_1.default();
const mangasee123sc = new mangasee123_1.scraper();
app.set('json spaces', 4);
app.use(body_parser_1.json());
app.use(body_parser_1.urlencoded({
    extended: false
}));
app.use('/manga', manga_1.default);
UserRoutes.routes(app);
app.use("/", (request, response) => {
    response.sendFile(__dirname + '/Routers/index.html');
});
app.listen(PORT, () => {
    console.log("Server's on @" + PORT);
    node_cron_1.default.schedule('0 0 0 * * *', () => {
        mangasee123sc.all();
    });
});
//# sourceMappingURL=index.js.map