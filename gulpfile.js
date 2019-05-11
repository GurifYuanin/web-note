var os = require('os');
var gulp = require('gulp'),
    sass = require('gulp-sass'), // sass 预编译
    autoprefixer = require('gulp-autoprefixer'), // css 前缀自动补全
    minifycss = require('gulp-minify-css'), // css 压缩
    minifyimg = require('gulp-imagemin'), // 图片压缩
    // minifyjs = require('gulp-uglify'), // js 压缩
    uglify = require('gulp-uglify-es').default, // js 压缩
    gutil = require('gulp-util');
// 复制 html 文件（不压缩因为文档中一些地方需要空白）
var isWin = /windows/i.test(os.type()); // 是否为 window 操作系统
gulp.task('copyhtml', function (done) {
    gulp.src(['./html/*.html']).pipe(gulp.dest('./dist/html'));
    isWin && gulp.src(['./html/*.html']).pipe(gulp.dest('G:/web/site/public/other/web-note/html'));
    done();
});
// 复制 demo 文件
gulp.task('copydemo', function (done) {
    gulp.src('./demo/*.html').pipe(gulp.dest('./dist/demo'));
    isWin && gulp.src('./demo/*.html').pipe(gulp.dest('G:/web/site/public/other/web-note/demo'));
    done();
});
// 复制 css 文件
gulp.task('copycss', function (done) {
    gulp.src(['./css/**']).pipe(gulp.dest('./dist/css'));
    isWin && gulp.src(['./css/**']).pipe(gulp.dest('G:/web/site/public/other/web-note/css'));
    done();
});
// 监听 sass 编译
gulp.task('sass', function (done) {
    gulp.src(['./scss/dark.scss', './scss/bright.scss'])
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(minifycss())
        .pipe(autoprefixer({
            add: true, // 是否添加前缀
            remove: true, // 是否删除过时前缀
            flexbox: false // 是否为 flexbox 添加前缀
        }))
        .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(gulp.dest('css'));
    gulp.src('./css/*.css').pipe(gulp.dest('./dist/css'));
    isWin && gulp.src('./css/*.css').pipe(gulp.dest('G:/web/site/public/other/web-note/css'));
    done();
});
// 压缩图片
gulp.task('minifyimg', function (done) {
    gulp.src('./images/**')
        .pipe(minifyimg())
        .pipe(gulp.dest('./dist/images'));
    isWin && gulp.src('./dist/images').pipe(gulp.dest('G:/web/site/public/other/web-note/images'));
    done();
});
// 压缩 js 文件
gulp.task('minifyjs', function (done) {
    gulp.src('./js/*.js')
        .pipe(uglify({
            mangle: true, // 是否修改变量名
            compress: true // 是否完全压缩
        }))
        .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(gulp.dest('./dist/js'));
    isWin && gulp.src('./dist/js').pipe(gulp.dest('G:/web/site/public/other/web-note/js'));
    done();
});

// 监听常用文件夹
gulp.task('default', function () {
    gulp.watch('./scss/*.scss', gulp.series('sass'));
    // gulp.watch('./images/*', gulp.parallel('minifyimg'));
    // gulp.watch('./js/*.js', gulp.parallel('minifyjs'));
});


// 直接执行
gulp.task('exec', gulp.parallel(...['copyhtml', 'copydemo', 'copycss', 'sass', 'minifyimg', 'minifyjs']));