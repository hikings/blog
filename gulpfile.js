var gulp = require('gulp');
    var minifycss = require('gulp-minify-css');
    var uglify = require('gulp-uglify');
    var rename = require('gulp-rename');
    var htmlmin = require('gulp-htmlmin');
    var concat = require('gulp-concat');
    var htmlclean = require('gulp-htmlclean');

    // 获取 gulp-imagemin 模块
    var imagemin = require('gulp-imagemin')

    // 压缩 public 目录 css
    gulp.task('minify-css', function() {
        return gulp.src('./public/**/*.css')
            .pipe(minifycss())
            .pipe(gulp.dest('./public'));
    });
    // 压缩 public 目录 html
    gulp.task('minify-html', function() {
      return gulp.src('./public/**/*.html')
        .pipe(htmlclean())
        .pipe(htmlmin({
             removeComments: true,
             minifyJS: true,
             minifyCSS: true,
             minifyURLs: true,
        }))
        .pipe(gulp.dest('./public'))
    });
    // 压缩 public/js 目录 js
    gulp.task('minify-js', function() {
        return gulp.src('./public/**/*.js')
            .pipe(rename({suffix:'.min'}))
            .pipe(uglify())
            .pipe(gulp.dest('./public'));
    });

    // 压缩 public/js 目录 js
    gulp.task('minify-lazyjs', function() {
        return gulp.src('./public/js/lazy/*.js')
            .pipe(concat('lazy.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('./public/js/'));
    });

    // 压缩图片任务
    // 在命令行输入 gulp images 启动此任务
    gulp.task('images', function () {
        // 1. 找到图片
        gulp.src('./photos/*.*')
        // 2. 压缩图片
            .pipe(imagemin({
                progressive: true
            }))
        // 3. 另存图片
            .pipe(gulp.dest('dist/images'))
    });



    // 执行 gulp 命令时执行的任务
    gulp.task('default', [
        'minify-html','minify-css','minify-js','images','minify-lazyjs'
    ]);
