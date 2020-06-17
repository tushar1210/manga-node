var gulp = require('gulp');
var del = require('del');

function defaultTask(cb) {
  // place code for your default task here
  
  del([
        'src/*.js'
      ]);
  cb();
}
exports.default = defaultTask





