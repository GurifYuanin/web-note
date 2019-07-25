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
    ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');

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
    watch(['./scss/*.scss'], compileSass);
    callback();
}

// js 编译和压缩
function compileJavascript(callback) {
    tsProject.src()
             .pipe(tsProject())
             .js
             .pipe(concat('index.min.js'))
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
    watch('js/index.ts', compileJavascript);
    callback();
}

exports.default = parallel(watchSass, watchJavascript);

exports.build = parallel(compileSass, compileJavascript);