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
            .then((data) => {
            response.status(201).json(data);
        })
            .catch((e) => {
            response.status(500).json(e);
        });
    }
}));
router.get('/:mangaId/latest-updates', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let mangaId = req.params.mangaId.toString();
    if (mangaId == '0') {
        let mangaseeSc = new mangasee123_1.scraper();
        yield mangaseeSc
            .latestUpdates()
            .then((data) => {
            res.status(201).json(data);
        })
            .catch((e) => {
            res.status(500).json(e);
        });
    }
}));
router.get('/:mangaId/get-all', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let mangaId = request.params.mangaId.toString();
    if (mangaId == '0') {
        let mangasee = new mangasee123_1.scraper();
        yield mangasee
            .getAll()
            .then((data) => {
            response.status(201).json(data);
        })
            .catch((e) => {
            response.status(500).json(e);
        });
    }
}));
router.get('/:mangaId/search/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let keyWord = request.query.keyWord.toString();
    let mangaId = request.params.mangaId.toString();
    if (mangaId == '0') {
        let mangaseesc = new mangasee123_1.scraper();
        yield mangaseesc
            .search(keyWord)
            .then((data) => {
            response.status(201).json(data);
        })
            .catch((e) => {
            response.status(500).json(e);
        });
    }
}));
router.get('/:mangaId/chaps/:mangaName', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let mangaId = req.params.mangaId.toString();
    if (mangaId == '0') {
        let mangasee = new mangasee123_1.scraper();
        yield mangasee
            .getChaps(req.params.mangaName.toString())
            .then((data) => {
            res.status(201).json(data);
        })
            .catch((e) => {
            res.status(500).json(e);
        });
    }
}));
router.get('/:mangaId/manga-data', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let chapterURL = request.query.chapterURL.toString();
    let mangaId = request.params.mangaId.toString();
    if (mangaId == '0') {
        let mangaseesc = new mangasee123_1.scraper();
        if (chapterURL == null || chapterURL == '') {
            let resp = {
                success: false,
                data: {}
            };
            return response.status(400).json(resp);
        }
        yield mangaseesc
            .mangaData(chapterURL)
            .then((data) => {
            response.status(201).json(data);
        })
            .catch((e) => {
            response.status(500).json(e);
        });
    }
}));
exports.default = router;
//# sourceMappingURL=manga.js.map