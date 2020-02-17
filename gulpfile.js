(function() {
  'use strict';

  var path = require('path');
  var gulp = require('gulp');
  var fs = require('fs');
  var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'del'],
  });

  //import
  fs.readdirSync('./build').map(function(file) {
    require('./build/' + file);
  });

  gulp.task('default', gulp.series(['clean', 'styles', 'docs']));
})();
