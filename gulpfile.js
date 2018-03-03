var gulp = require('gulp'),
       sass = require('gulp-sass'), // sass 预编译
       autoprefixer = require('gulp-autoprefixer'), // css 前缀自动补全
       minifycss = require('gulp-minify-css'), // css 压缩
       minifyimg = require('gulp-imagemin'), // 图片压缩
       minifyjs = require('gulp-uglify'); // js 压缩

gulp.task('copyhtml', function() {
    gulp.src(['./html/*.html'])
             .pipe(gulp.dest('./dist/html'));
});
gulp.task('copydemo', function() {
    gulp.src('./demo/*.html')
             .pipe(gulp.dest('./dist/demo'));
});
gulp.task('sass', function () {
    gulp.src('./scss/*.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(minifycss())
        .pipe(autoprefixer({
            add: true, // 是否添加前缀
            remove: true, // 是否删除过时前缀
            flexbox: false // 是否为 flexbox 添加前缀
        }))
        .pipe(gulp.dest('./dist/css'));
});
gulp.task('minifyimg', function() {
    gulp.src('./images/*')
             .pipe(minifyimg())
             .pipe(gulp.dest('./dist/images'));
});
gulp.task('minifyjs', function() {
    gulp.src('./js/*.js')
             .pipe(minifyjs({
                mangle: true, // 是否修改变量名
                compress: true // 是否完全压缩
        }))
             .pipe(gulp.dest('./dist/js'));
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
gulp.task('exec', ['copyhtml', 'copydemo',  'sass', 'minifyimg', 'minifyjs']);