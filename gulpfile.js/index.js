const config = require('./config');
const browserSync = require("browser-sync").create();
const {series, parallel, watch} = require("gulp");

const js = require('./tasks/js').js(config.localServerProjectPath, config.filesJsOrder, config.files.js);
js.displayName = 'js';

const sass = require('./tasks/sass').sass(config.localServerProjectPath, config.files.sass);
sass.displayName = 'sass';

const html = require('./tasks/html').html(config.localServerProjectPath, config.files.html);
html.displayName = 'html';

const vendor = require('./tasks/vendor').vendor(config.localServerProjectPath, config.files.vendor);
html.displayName = 'vendor';

const templates = require('./tasks/templates').templates(config.localServerProjectPath, config.files.templates, config.files.partials);
html.displayName = 'templates';

const hello = function (done) {
    console.log(`Groeten van ${config.voornaam}!`);
    done();
};

const watchFiles = () => {
    browserSync.init({ server: { baseDir: "./"}});

    watch(['./css/*.scss', './features/**/*.scss'], series(sass));
    watch(['./js/*.js', './features/**/*.js'], series(js));
    watch(['./index.html', './features/index.html'], series(html));
    watch(['./vendor/*.js', './features/**/*.js'], series(vendor));
    watch(['./templates/**/*.hbs', './features/**/*.hbs'], series(templates));


    watch("./css/*.scss").on("change", browserSync.reload);
    watch("./js/*.js").on("change", browserSync.reload);
    watch("./index.html").on("change", browserSync.reload);
    watch("./vendor/*.js").on("change", browserSync.reload);
    watch("./templates/**/*.hbs").on("change", browserSync.reload);

};

exports.watch = watchFiles;

exports.templates = templates;

exports.default = hello;

exports.all = parallel(sass,js, html, vendor, templates);
