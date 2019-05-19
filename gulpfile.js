const {
    watch,
    parallel,
    src,
    dest
} = require('gulp');
const concat = require('gulp-concat');

const sass = require('gulp-sass'), // sass 预编译
    autoprefixer = require('gulp-autoprefixer'), // css 前缀自动补全
    minifycss = require('gulp-minify-css'); // css 压缩

const uglify = require('gulp-uglify-es').default, // js 压缩
    babel = require('gulp-babel'); // js 编译

const gutil = require('gulp-util');

// sass 编译
function compileSass(callback) {
    src(['./scss/dark.scss', './scss/bright.scss'])
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(minifycss())
        .pipe(autoprefixer({
            add: true, // 是否添加前缀
            remove: true, // 是否删除过时前缀
            flexbox: false // 是否为 flexbox 添加前缀
        }))
        .on('error', function (err) {
            gutil.log(gutil.colors.red('[Error]'), err.toString());
        })
        .pipe(dest('css'));
    callback();
}

function watchSass(callback) {
    watch(['./scss/dark.scss', './scss/bright.scss'], compileSass);
    callback();
}

// js 编译和压缩
function compileJavascript(callback) {
    src(['js/lib/*.js', 'js/index.js'])
        .pipe(concat('index.min.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify({
            mangle: true, // 是否修改变量名
            compress: true // 是否完全压缩
        }))
        .on('error', function (err) {
            gutil.log(gutil.colors.red('[Error]'), err.toString());
        })
        .pipe(dest('js'));
    callback();
}

function watchJavascript(callback) {
    watch('js/index.js', compileJavascript);
    callback();
}

exports.default = parallel(watchSass, watchJavascript);