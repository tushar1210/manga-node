var gulp = require('gulp');
var del = require('del');
let tslint = require("gulp-tslint");

const TSLINT = "tslint";
const TS_SRC_GLOB = "./src/**/*.ts";
const TS_GLOB = [TS_SRC_GLOB];

function defaultTask(cb) {
  // place code for your default task here

  del([
    'src/*.js',
    'src/*/*.js',
    'src/*/*/*.js',
    'src/*/*/*/*.js'
  ]);
  cb();
}

// Checks all *.ts-files if they are conform to the rules specified in tslint.json.
gulp.task(TSLINT, function () {
  return gulp.src(TS_GLOB)
    .pipe(tslint({
      formatter: "verbose"
    }))
    .pipe(tslint.report({
      // set this to true, if you want the build process to fail on tslint errors.
      emitError: false
    }));
});

exports.default = defaultTask
