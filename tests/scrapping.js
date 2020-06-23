"use strict";
exports.__esModule = true;
var kissManga = require("../src/Handlers/kissmanga");
var list = [];
kissManga.scrapeKissMangaAll('0')
    .then(function (data) {
    if (data.length == 0) {
        console.log('hello');
    }
    data.forEach(function (element) {
        list.push(element);
    });
    // kissManga.scrapeKissMangaAll('2').then((data)=>{
    //         // console.log(data)
    // }).catch((e)=>{console.log(e);})
    // console.log(list.length)
})["catch"](function (e) {
    console.log(e);
    return;
});
// Fs.appendFileSync('./build/temp/kissmanga.json',JSON.stringify(list))
