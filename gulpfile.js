var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html"
    }
  });
});

//setup:
/*
- clone repo
- npm install
- npm install gulp -g
- npm install typescript -g
- apm install atom-typescript
- atom .
- gulp serve
*/
