const {src, dest} = require('gulp');
const concat = require('gulp-concat');

const vendor = function (serverProjectPath, files_vendor) {
    return function () {
        return src(files_vendor)
            .pipe(concat('vendor.js'))
            .pipe(dest('./dist/js'))
            .pipe(dest(serverProjectPath+'\\js'));
    }
};

exports.vendor = vendor;