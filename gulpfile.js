var gulp = require('gulp'),
       sass = require('gulp-sass'), // sass 预编译
       autoprefixer = require('gulp-autoprefixer'), // css 前缀自动补全
       minifycss = require('gulp-minify-css'), // css 压缩
       minifyimg = require('gulp-imagemin'), // 图片压缩
       // minifyjs = require('gulp-uglify'), // js 压缩
       uglify = require('gulp-uglify-es').default, // js 压缩
       gutil = require('gulp-util');
// 复制 html 文件（不压缩因为文档中一些地方需要空白）
gulp.task('copyhtml', function() {
    gulp.src(['./html/*.html']).pipe(gulp.dest('./dist/html'));
    gulp.src(['./html/*.html']).pipe(gulp.dest('G:/web/site/public/other/web-note/html'));
});
// 复制 demo 文件
gulp.task('copydemo', function() {
    gulp.src('./demo/*.html').pipe(gulp.dest('./dist/demo'));
    gulp.src('./demo/*.html').pipe(gulp.dest('G:/web/site/public/other/web-note/demo'));
});
// 复制 css 文件
gulp.task('copycss', function(){
    gulp.src(['./css/**']).pipe(gulp.dest('./dist/css'));
    gulp.src(['./css/**']).pipe(gulp.dest('G:/web/site/public/other/web-note/css'));
});
// 监听 sass 编译
gulp.task('sass', function () {
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
    gulp.src('./css/*.css').pipe(gulp.dest('G:/web/site/public/other/web-note/css'));
});
// 压缩图片
gulp.task('minifyimg', function() {
    gulp.src('./images/**')
             .pipe(minifyimg())
             .pipe(gulp.dest('./dist/images'));
    gulp.src('./dist/images').pipe(gulp.dest('G:/web/site/public/other/web-note/images'));
});
// 压缩 js 文件
gulp.task('minifyjs', function() {
    gulp.src('./js/*.js')
             .pipe(uglify({
                mangle: true, // 是否修改变量名
                compress: true // 是否完全压缩
             }))
             .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
             .pipe(gulp.dest('./dist/js'));
    gulp.src('./dist/js').pipe(gulp.dest('G:/web/site/public/other/web-note/js'));
});

// 监听常用文件夹
gulp.task('default', function() {
    gulp.watch('./html/*.html',  ['copyhtml']);
    gulp.watch('./demo/*.html', ['copydemo']);
    gulp.watch('./scss/*.scss', ['sass']);
    gulp.watch('./images/*', ['minifyimg']);
    gulp.watch('./js/*.js', ['minifyjs']);
});


// 直接执行
gulp.task('exec', ['copyhtml', 'copydemo',  'copycss', 'sass', 'minifyimg', 'minifyjs']);