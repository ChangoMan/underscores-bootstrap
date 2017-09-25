var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    sourcemaps   = require('gulp-sourcemaps');
    uglify       = require('gulp-uglify');
    concat       = require('gulp-concat');

gulp.task('sitecss', function() {
    gulp.src([
        "!assets/scss/bootstrap/**/*", // Ignore the /bootstrap directory and all it's contents
        'assets/scss/**/*.scss'
        ])
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle:'compressed'
        }).on('error', sass.logError))
        // .pipe(sourcemaps.write('../css'))
        .pipe(gulp.dest('assets/css/'));
});

var jsFiles = 'assets/js/build/**/*.js',
    jsDest = 'assets/js';

gulp.task('scripts', function() {
    return gulp.src(jsFiles)
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});

gulp.task('watch', function () {
    gulp.watch('assets/scss/**/*.scss', ['sitecss']);
    gulp.watch(jsFiles, ['scripts']);
});

gulp.task("default", ["sitecss", "scripts"]);