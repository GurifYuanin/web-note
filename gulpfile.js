const {
    watch,
    parallel,
    src,
    dest
} = require('gulp');

const sass = require('gulp-sass')(require('sass')), // sass 预编译
    autoprefixer = require('gulp-autoprefixer'), // css 前缀自动补全
    cleanCSS = require('gulp-clean-css'); // css 压缩
const browserify = require('browserify');
const tsify = require('tsify');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const buffer = require('vinyl-buffer');

const uglify = require('gulp-uglify-es').default; // js 压缩
const log = require('fancy-log');

const isDev = process.env.NODE_ENV === 'development';
// sass 编译
function compileSass(callback) {
    src(['./scss/dark.scss', './scss/bright.scss'])
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(cleanCSS())
        .pipe(autoprefixer({
            add: true, // 是否添加前缀
            remove: true, // 是否删除过时前缀
            flexbox: false // 是否为 flexbox 添加前缀
        }))
        .on('error', function (err) {
            log.error(err.toString());
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
    browserify({
        basedir: '.',
        debug: isDev,
        entries: ['js/index.ts'],
        cache: {},
        packageCache: {},
    })
    .plugin(tsify)
    .transform('babelify', {
        presets: ["@babel/preset-env"],
        extensions: ['.ts']
    })
    .bundle()
    .on('error', function (err) {
        log.error(err.toString());
    })
    .pipe(source('index.min.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({
        loadMaps: isDev
    }))
    .pipe(uglify())
    .pipe(dest('js'));
    callback();
}

function watchJavascript(callback) {
    watch('js/index.ts', compileJavascript);
    callback();
}

exports.default = parallel(watchSass, watchJavascript);

exports.build = parallel(compileSass, compileJavascript);