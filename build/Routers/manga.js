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
const mangasee123_1 = require("../scrapper/mangasee123");
const mangakakalot_1 = require("../scrapper/mangakakalot");
const mangafox_1 = require("../scrapper/mangafox");
const router = express_1.Router();
router.get('/:mangaId/hotupdates', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
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
                error: e
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
                error: e
            };
            response.status(500).json(res);
        });
    }
    else if (mangaId == '2') {
        let mangafoxSc = new mangafox_1.mangafoxScraper();
        yield mangafoxSc
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
                error: e
            };
            response.status(500).json(res);
        });
    }
}));
router.get('/:mangaId/latestupdates', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
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
                error: e
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
                error: e
            };
            response.status(500).json(res);
        });
    }
    else if (mangaId == '2') {
        let mangafoxSc = new mangafox_1.mangafoxScraper();
        yield mangafoxSc
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
                success: true,
                error: e
            };
            response.status(500).json(res);
        });
    }
}));
router.get('/:mangaId/getall', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let mangaId = request.params.mangaId.toString();
    if (mangaId == '0') {
        let mangasee = new mangasee123_1.scraper();
        yield mangasee
            .getAll()
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
                error: e
            };
            response.status(500).json(res);
        });
    }
    else if (mangaId == '1') {
        let mangakakalotSc = new mangakakalot_1.scraper();
        yield mangakakalotSc.
            getAll()
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
                error: e
            };
            response.status(500).json(res);
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
            let res = {
                success: true,
                data: data
            };
            response.status(201).json(res);
        })
            .catch((e) => {
            let res = {
                success: false,
                error: e
            };
            response.status(500).json(res);
        });
    }
    if (mangaId == '1') {
        let mangakakalotsc = new mangakakalot_1.scraper();
        yield mangakakalotsc
            .search(keyWord)
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
                error: e
            };
            response.status(500).json(res);
        });
    }
    if (mangaId == '2') {
        let mangafoxSc = new mangafox_1.mangafoxScraper();
        yield mangafoxSc
            .search(keyWord)
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
                error: e
            };
            response.status(500).json(res);
        });
    }
}));
router.get('/:mangaId/chapters/:mangaName', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
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
                error: e
            };
            response.status(500).json(res);
        });
    }
    else if (mangaId == '1') {
        let mangakakalotSc = new mangakakalot_1.scraper();
        yield mangakakalotSc
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
                error: e
            };
            response.status(500).json(res);
        });
    }
    else if (mangaId == '2') {
        let mangafoxSc = new mangafox_1.mangafoxScraper();
        yield mangafoxSc
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
                error: e
            };
            response.status(500).json(res);
        });
    }
}));
router.get('/:mangaId/mangadata', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let chapterURL = request.query.chapterURL.toString();
    let mangaId = request.params.mangaId.toString();
    if (chapterURL == null || chapterURL == '') {
        let resp = {
            success: false,
            data: {}
        };
        return response.status(400).json(resp);
    }
    if (mangaId == '0') {
        let mangaseesc = new mangasee123_1.scraper();
        yield mangaseesc
            .mangaData(chapterURL)
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
                error: e
            };
            response.status(500).json(res);
        });
    }
    else if (mangaId == '1') {
        let mangakakalotSc = new mangakakalot_1.scraper();
        yield mangakakalotSc
            .mangaData(chapterURL)
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
                error: e
            };
            response.status(500).json(res);
        });
    }
    else if (mangaId == '2') {
        let mangafoxSc = new mangafox_1.mangafoxScraper();
        yield mangafoxSc
            .mangaData(chapterURL)
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
                error: e
            };
            response.status(500).json(res);
        });
    }
}));
router.get('/sources', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let data = JSON.parse(Fs.readFileSync('./public/sources.json').toString());
    return response.json(data);
}));
router.get('/search', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let mangaseesc = new mangasee123_1.scraper();
    let mangakakalotSc = new mangakakalot_1.scraper();
    let mangafoxSc = new mangafox_1.mangafoxScraper();
    let keyWord = request.query.keyWord.toString();
    if (keyWord == undefined || keyWord == 'undefined') {
        let errorRes = {
            success: false,
            error: 'Bad Request',
            errorMessage: 'Keyword incorrect/missing'
        };
        response.status(400).json(errorRes);
    }
    let searchDataArray = [];
    yield mangaseesc
        .search(keyWord)
        .then((data) => {
        searchDataArray = searchDataArray.concat(data);
    })
        .catch((e) => {
        let errorRes = {
            success: false,
            error: e
        };
        response.status(500).json(errorRes);
    });
    yield mangakakalotSc
        .search(keyWord)
        .then((data) => {
        searchDataArray = searchDataArray.concat(data);
    })
        .catch((e) => {
        let errorRes = {
            success: false,
            error: e
        };
        response.status(500).json(errorRes);
    });
    yield mangafoxSc
        .search(keyWord)
        .then((data) => {
        searchDataArray = searchDataArray.concat(data);
    })
        .catch((e) => {
        let errorRes = {
            success: false,
            error: e
        };
        response.status(500).json(errorRes);
    });
    let res = {
        success: true,
        data: searchDataArray
    };
    response.status(201).json(res);
}));
exports.default = router;
//# sourceMappingURL=manga.js.map