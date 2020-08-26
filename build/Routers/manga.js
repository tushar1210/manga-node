"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mangasee123_1 = require("../Scrapper/mangasee123");
const router = express_1.Router();
const sources = {
    0: "https://mangasee123.com"
};
router.get('/:mangaId/hot-updates', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let mangaId = request.params.mangaId.toString();
    if (mangaId == '0') {
        let mangasee = new mangasee123_1.scraper();
        yield mangasee
            .hotUpdates()
            .then(dat => {
            response.json(dat);
        })
            .catch(e => {
            response.status(500).json(e);
        });
    }
}));
exports.default = router;
//# sourceMappingURL=manga.js.map