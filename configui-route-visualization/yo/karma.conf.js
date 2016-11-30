// Karma configuration

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: ['bower_components/angular/angular.js',
                'bower_components/angular-mocks/angular-mocks.js',
                'bower_components/jquery/dist/jquery.js',
                'bower_components/angular/angular.min.js',
                'bower_components/angular-ui-router/release/angular-ui-router.js',
                'bower_components/angular-route/angular-route.js',
                'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
                'bower_components/bootstrap/dist/js/bootstrap.js',
                'bower_components/jquery-ui/jquery-ui.js',
                'bower_components/angular-animate/angular-animate.js',
                'bower_components/jquery.easing/js/jquery.easing.js',
                'bower_components/bootbox/bootbox.js',
                'bower_components/ngBootbox/dist/ngBootbox.js',
                'bower_components/lodash/lodash.js',
                'bower_components/restangular/dist/restangular.js',
                'bower_components/perfect-scrollbar/src/perfect-scrollbar.js',
                'bower_components/angular-perfect-scrollbar/src/angular-perfect-scrollbar.js',
                'bower_components/StickyTableHeaders/js/jquery.stickytableheaders.min.js',
                'bower_components/angular-messages/angular-messages.js',
                'bower_components/textAngular/dist/textAngular-sanitize.min.js',
                'bower_components/textAngular/dist/textAngular.min.js',
                'bower_components/rangy/rangy-core.min.js',
                'bower_components/rangy/rangy-selectionsaverestore.min.js',
                'bower_components/spin.js/spin.js',
                'bower_components/angular-spinner/angular-spinner.js',
                'bower_components/angular-file-upload/angular-file-upload.min.js',
                'bower_components/angular-toastr/dist/angular-toastr.tpls.js',
                'bower_components/angular-ui-select/dist/select.js',
                'bower_components/angular-xeditable/dist/js/xeditable.min.js',
                'bower_components/es5-shim/es5-shim.js',
                'bower_components/es5-shim/es5-sham.js',
                'bower_components/ng-idle/angular-idle.min.js',
                'app/common/js/*.js',
                'app/common/js/**/*.js',
                'app/components/**/*.js',
                'test/**/*Spec.js'
               ],


        // list of files to exclude
        exclude: [
    ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {},


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}