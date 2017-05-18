const gulp = require('gulp');
const browserSync = require('browser-sync');
const wiredep = require('wiredep').stream;
const angularFilesort = require('gulp-angular-filesort');
const gulpInject = require('gulp-inject');

const conf = require('../conf/gulp.conf');

gulp.task('inject', inject);

function inject() {
  const injectStyles = gulp.src([
    conf.path.src('../bower_components/**/*.css'),
    conf.path.src('**/*.css'),
    `!${conf.path.src('../bower_components/js-md5/**/*.css')}`,
    `!${conf.path.src('../bower_components/lodash/**/*.*.css')}`,
    `!${conf.path.src('../bower_components/lodash/**/*.css')}`
  ], {read: false});
  const injectScripts = gulp.src([
    conf.path.tmp('**/*.js'),
    `!${conf.path.tmp('**/*.spec.js')}`,
    //
    conf.path.src('../bower_components/**/*.min.js'),

    `!${conf.path.src('../bower_components/jquery/**.**')}`,
    `!${conf.path.src('../bower_components/chart.js/**.**')}`,

    `!${conf.path.src('../bower_components/angular/**/*.js')}`,
    `!${conf.path.src('../bower_components/angular-ui-router/**/*.*.js')}`,
    `!${conf.path.src('../bower_components/lodash/**/*.*.js')}`
  ])
  .pipe(angularFilesort()).on('error', conf.errorHandler('AngularFilesort'));

  const injectOptions = {
    ignorePath: [conf.paths.src, conf.paths.tmp],
    addRootSlash: false
  };

  return gulp.src(conf.path.src('index.html'))
    .pipe(gulpInject(injectStyles, injectOptions))
    .pipe(gulpInject(injectScripts, injectOptions))
    .pipe(wiredep(Object.assign({}, conf.wiredep)))
    .pipe(gulp.dest(conf.paths.tmp))
    .pipe(browserSync.stream());
}
