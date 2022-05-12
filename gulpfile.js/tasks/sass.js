const {src, dest} = require('gulp');
const gulpSass =  require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');

const sass = function (backendPath, files_sass) {
    return function () {
        return src(files_sass)
            .pipe(gulpSass().on('error', gulpSass.logError))
            .pipe(dest('./dist/sass'))
            .pipe(concat('style.min.css'))
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(rename('style.min.css'))
            .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
            .pipe(dest('./dist/css'))
            .pipe(dest(backendPath+'\\css'));
    }
};

exports.sass = sass;