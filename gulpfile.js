var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var sloc = require('gulp-sloc');
var exec = require('exec');

gulp.task('sloc', function () {
    gulp.src(['./public_html/src/**/*.*'])
            .pipe(sloc({
                tolerant: true
            }));
});

//Coverage sync
gulp.task('t', ['test', 'sloc'], function () {
    browserSync({
        server: {
            baseDir: "./"
        },
        startPath: "./test/coverage/Chrome%2053.0.2785%20(Mac%20OS%20X%2010.11.4)/index.html"
    });
});


// Browser Sync
gulp.task('b', ['build', 'sloc'], function () {
    browserSync({
        server: {
            baseDir: "./"
        },
        startPath: "/public_html/html/hello.html"
    });
});

gulp.task('test', function () {
    exec('./node_modules/karma/bin/karma start karma.conf.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
  });
});

gulp.task('build', function () {
    exec('./node_modules/.bin/webpack --color', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
  });
});

gulp.task('jsxformat', function () {
  exec('esformatter -i public_html/src/app.jsx', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
  });
});

gulp.task('jsxformatall', function () {
  exec('esformatter -i public_html/src/**/*.jsx', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
  });
});