module.exports = {
    localServerProjectPath : 'C:\\Users\\jordi\\source\\projects\\ReversiMvcApp\\ReversiMvcApp\\wwwroot',

    filesJsOrder :( [ 'js/game.js', 'js/game.data.js',
                                'js/game.model.js', 'js/game.reversi.js',
                                'js/feedbackWidget.js' ]),

    files: {
        js: [
            'js/**/*.js',
            'js/*.js'
        ],
        sass: [
            'css/*.scss',
            'css/*.css',
            'css/**/*.scss',
            'sass/*.scss',
            'sass/**/*.scss',
        ],
         html: [
            'index.html'
        ],
        vendor: [
            'vendor/*.js',
            'vendor/**/*.js'
        ],
        templates: [
             'templates/[^_]*.hbs',
             'templates/**/[^_]*.hbs',
             'templates/**/**/[^_]*.hbs'
        ],
        partials: [
             'templates/_*.hbs',
             'templates/**/_*.hbs',
             'templates/**/**/_*.hbs'
        ]
    },


    voornaam: 'Jordi',


};