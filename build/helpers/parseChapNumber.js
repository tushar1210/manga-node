"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseChapNumber = void 0;
const parseChapNumber = (chapNumber) => {
    let chapNumberR = chapNumber.substring(2, 5);
    if (chapNumberR.substring(0, 1) == "0") {
        chapNumberR = chapNumberR.substring(1, 3);
        if (chapNumberR.substring(0, 1) == "0") {
            chapNumberR = chapNumberR.substring(1, 2);
        }
    }
    return chapNumberR;
};
exports.parseChapNumber = parseChapNumber;
//# sourceMappingURL=parseChapNumber.js.map