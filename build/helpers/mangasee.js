"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.thumbnail = exports.chapToken = exports.parseChapNumber = void 0;
const parseChapNumber = (chapNumber) => {
    let chapNumberR = chapNumber.substring(2, 5);
    if (chapNumberR.substring(0, 1) == "0") {
        chapNumberR = chapNumberR.substring(1, 3);
        if (chapNumberR.substring(0, 1) == "0") {
            chapNumberR = chapNumberR.substring(1, 2);
        }
    }
    if (chapNumber.substring(5, 6) != "0")
        chapNumberR = chapNumberR + "." + chapNumber.substring(5, 6);
    return chapNumberR;
};
exports.parseChapNumber = parseChapNumber;
const chapToken = (chapNumber) => {
    let token = "";
    let t = chapNumber.substring(0, 1);
    if (t != "1") {
        token = "-index-" + t;
    }
    return token;
};
exports.chapToken = chapToken;
const thumbnail = (indexName) => {
    return "https://cover.nep.li/cover/" + indexName + '.jpg';
};
exports.thumbnail = thumbnail;
//# sourceMappingURL=mangasee.js.map