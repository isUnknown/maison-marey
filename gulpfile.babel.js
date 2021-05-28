const {src, dest, series, parallel, watch} = require ('gulp'),
    autoPrefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglifycss = require('gulp-uglifycss'),
    babel = require('gulp-babel')

function minCss() {
    return src('assets/style.css')
        .pipe(concat('style.css'))
        .pipe(autoPrefixer())
        .pipe(uglifycss())
        .pipe(dest('assets/dist'))
}

function watchTask() {
    watch('assets/style.css', parallel(minCss))
}

function babelJs() {
    return src('assets/js/*')
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(dest('assets/dist/script.js'))
}

module.exports = {
    minCss,
    watchTask,
    babelJs,
    default: parallel(minCss, babelJs)
}