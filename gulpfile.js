const {src, dest, series} = require('gulp')
const sass = require('gulp-sass')
const csso = require('gulp-csso')
const include = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')
const del = require('del')
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const sync = require('browser-sync').create()

function html() {
    return src('src/**.html')
        .pipe(include({
            prefix: '@@'
            }))
        .pipe(dest('dist'))

}

function scss(){
    return src('src/scss/**.scss')
        .pipe(sass())
        .pipe(dest('dist'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(csso())
        .pipe(concat('index.css'))
        .pipe(dest('dist'))
}

function clear() {
    return del('dist')
}


exports.build = series(clear,scss,html)
exports.clear = clear