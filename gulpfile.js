var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

// 启动服务器
gulp.task('initServer', function() {
    browserSync.init({
        server: {
            baseDir: './'
        },
        port: 8080
    });
});

// 编译scss任务
gulp.task('sass', function () {
    gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'));
});

// 监听事件
gulp.task('watchCompileScss', function() {
    gulp.watch('scss/*.scss', ['sass']);
});
gulp.task('watchChange', function() {
    gulp.watch(['css/*.css', 'js/*.js', 'login.html'], function(){
        browserSync.reload('login.html');
    });
});

gulp.task('default', ['initServer', 'watchCompileScss', 'watchChange']);