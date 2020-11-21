"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseChapNumber = void 0;
const parseChapNumber = (chapNumber, chapterURL, char, format) => {
    let chpJSON = {};
    for (let index = 1; index < chapNumber; index++) {
        let strIdx = String(index);
        let imageURL = '';
        if (strIdx.length == 1) {
            imageURL = `https:${chapterURL}/${char}00${strIdx}.jpg`;
        }
        else if (strIdx.length == 2) {
            imageURL = `https:${chapterURL}/${char}0${strIdx}.jpg`;
        }
        else {
            imageURL = `https:${chapterURL}/${char}${strIdx}.jpg`;
        }
        chpJSON[index] = imageURL;
    }
    return chpJSON;
};
exports.parseChapNumber = parseChapNumber;
//# sourceMappingURL=mangafox.js.map