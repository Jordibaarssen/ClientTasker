const {src, dest} = require('gulp');
const order = require('gulp-order');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

const fn = function (backendPath, filesJSOrder, fileJs) {
    return function () {
        // console.log(`Taak js is uitgevoerd, ${voornaam}!`);
        // return Promise.resolve('Klaar');

        return src(fileJs)
            .pipe(order(filesJSOrder, {base: './'}))
            .pipe(concat('app.js'))
            .pipe(babel({
                presets: ['@babel/preset-env']
            }))
            .pipe(dest('./dist/js/normal'))
            .pipe(uglify({compress:true}))
            .pipe(dest('./dist/js'))
            .pipe(dest(backendPath + '\\js'));
    }
};



exports.js = fn;
