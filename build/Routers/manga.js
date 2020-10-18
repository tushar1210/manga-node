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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const Fs = __importStar(require("fs"));
const express_1 = require("express");
const mangasee123_1 = require("../Scrapper/mangasee123");
const mangakakalot_1 = require("../Scrapper/mangakakalot");
const router = express_1.Router();
router.get('/:mangaId/hot-updates', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let mangaId = request.params.mangaId.toString();
    if (mangaId == '0') {
        let mangasee = new mangasee123_1.scraper();
        yield mangasee
            .hotUpdates()
            .then((data) => {
            let res = {
                success: true,
                data: data
            };
            response.status(201).json(res);
        })
            .catch((e) => {
            let res = {
                success: false,
                data: []
            };
            response.status(500).json(res);
        });
    }
    else if (mangaId == '1') {
        let mangakakalot = new mangakakalot_1.scraper();
        yield mangakakalot
            .hotUpdates()
            .then((data) => {
            let res = {
                success: true,
                data: data
            };
            response.json(res);
        })
            .catch((e) => {
            let res = {
                success: false,
                data: []
            };
            response.status(500).json(res);
        });
    }
}));
router.get('/:mangaId/latest-updates', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let mangaId = request.params.mangaId.toString();
    if (mangaId == '0') {
        let mangaseeSc = new mangasee123_1.scraper();
        yield mangaseeSc
            .latestUpdates()
            .then((data) => {
            let res = {
                success: true,
                data: data
            };
            response.status(201).json(res);
        })
            .catch((e) => {
            let res = {
                success: false,
                data: []
            };
            response.status(500).json(res);
        });
    }
    else if (mangaId == '1') {
        let mangakakalotSc = new mangakakalot_1.scraper();
        yield mangakakalotSc
            .latestUpdates()
            .then((data) => {
            let res = {
                success: true,
                data: data
            };
            response.status(201).json(res);
        })
            .catch((e) => {
            let res = {
                success: false,
                data: []
            };
            response.status(500).json(res);
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
            response.status(201).json({
                success: true,
                data: data
            });
        })
            .catch((e) => {
            response.status(500).json({
                success: false,
                data: []
            });
        });
    }
    else if (mangaId == '1') {
        response.status(503).json({
            success: false,
            error: "Unavailable for this source"
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
            response.status(201).json({
                success: true,
                data: data
            });
        })
            .catch((e) => {
            response.status(500).json({
                success: false,
                data: []
            });
        });
    }
    if (mangaId == '1') {
        let mangakakalotsc = new mangakakalot_1.scraper();
        yield mangakakalotsc
            .search(keyWord)
            .then((data) => {
            response.status(201).json({
                success: true,
                data: data
            });
        })
            .catch((e) => {
            response.status(500).json({
                success: false,
                error: e
            });
        });
    }
}));
router.get('/:mangaId/chaps/:mangaName', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let mangaId = request.params.mangaId.toString();
    let mangaName = request.params.mangaName.toString();
    mangaName = mangaName.replace(/[ ]/gm, '-');
    if (mangaId == '0') {
        let mangasee = new mangasee123_1.scraper();
        yield mangasee
            .getChaps(mangaName)
            .then((data) => {
            let res = {
                success: true,
                data: data
            };
            response.status(201).json(res);
        })
            .catch((e) => {
            let res = {
                success: false,
                data: []
            };
            response.status(500).json(res);
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
router.get('/get-sources', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let data = JSON.parse(Fs.readFileSync('./src/sources.json').toString());
    return response.json(data);
}));
exports.default = router;
//# sourceMappingURL=manga.js.map