module.exports = function (grunt) {
    'use strict';
    require('load-grunt-tasks')(grunt);

    /*
     * Grunt tasks:
     * watch - watch the changes and rebuild less, templates, js and do reload
     * connect - run simple server
     * clean - delete temporary files/folders
     * less - to compile less
     * cssmin - to minify css (for vendor libs)
     * html2js - to compile AngularJS html-templates into one js file - templates.js
     * ngAnnotate - AngularJS modules minification (fix problems with annotation)
     * uglify - code uglification
     * copy - to copy files
     * sails-linker - to generate links to style-files and js-files in index.html
     *
     * Grunt commands:
     * grunt server(or just grunt) - to run server for dev env
     * grunt install - prepare dev env
     * grunt build - compile distributive (target folder)
     * grunt server:target - compile target and run server for it
     * */

    grunt.initConfig({

        appPath: 'app', //path to application source
        distPath: 'target', //path to distributive
        distPath2: 'target/app', //path to distributive
        watch: {
            html: {
                files: [
					'<%= appPath %>/components/**/*.html',
					'<%= appPath %>/components/**/**/*.html',
					'<%= appPath %>/components/**/**/**/*.html',
					'<%= appPath %>/components/**/**/**/**/*.html'
				],
                tasks: ['html2js'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            less: {
                files: ['app/components/**/*.less', 'app/common/**/*.less'],
                tasks: ['less'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            js: {
                files: ['<%= appPath %>/components/**/{,*/}*.js'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                tasks: ['wiredep', 'sails-linker:app']
                    // tasks: ['sails-linker:app']
            },
            app: {
                files: ['app/**/*', 'less/**/*', 'img/**/*']
                    //tasks: ['kickoff-maven']
            }
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },

        connect: {
            options: {
                port: 9002,
                hostname: 'localhost',
                livereload: 35729
            },
            app: {
                options: {
                    open: true,
                    base: ['<%= appPath %>', '.']
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= distPath %>'
                }
            }
        },

        clean: {
            target: '<%= distPath %>',
            tmp: '.tmp'
        },

        less: {
            development: {
                files: {
                    '<%= appPath %>/common/css/main.css': 'app/common/css/less/import.less'
                }
            }
        },

        cssmin: {
            combine: {
                files: {
                    '<%= distPath %>/common/css/main.css': ['app/common/css/main.css'],
                    '<%= distPath %>/common/css/vendor.css': [
						'bower_components/bootstrap/dist/css/bootstrap.css',
						'bower_components/css-toggle-switch/dist/toggle-switch.css',
						'bower_components/perfect-scrollbar/src/perfect-scrollbar.css',
						'bower_components/kendo-ui/styles/kendo.common.min.css',
						'bower_components/kendo-ui/styles/kendo.bootstrap.min.css',
						'bower_components/kendo-ui/styles/kendo.common-bootstrap.min.css',
						'bower_components/css-toggle-switch/dist/toggle-switch.css',
						'bower_components/angular-toastr/dist/angular-toastr.css',
						'bower_components/animate.css/animate.css',
						'bower_components/angular-ui-select/dist/select.css',
						'bower_components/angular-xeditable/dist/css/xeditable.css',
						'bower_components/textAngular/src/textAngular.css',
						'bower_components/font-awesome/css/font-awesome.css']
                }
            }
        },

        html2js: {
            options: {
                base: '<%= appPath %>/'
            },
            main: {
                src: ['<%= appPath %>/components/**/*.html'],
                dest: '<%= appPath %>/common/js/templates.js'
            }
        },

        ngAnnotate: {
            dist: {
                files: {
                    '.tmp/app/common/js/scripts.js': [
						'<%= appPath %>/common/js/**/*.js',
						'<%= appPath %>/components/**/*.js',
						'<%= appPath %>/components/**/**/*.js',
						'<%= appPath %>/components/**/**/**/*.js',
						'<%= appPath %>/components/**/**/**/**/*.js',
						'!<%= appPath %>/common/js/angular-kendo.all.min.js',
						'!<%= appPath %>/common/js/jquery.reject.js'
					]
                }
            }
        },

        uglify: {
            dist: {
                options: {
                    banner: '/* This is my minified app, built by jmccommas on \n <%= grunt.template.today() %>*/\n\n'
                },
                files: {
                    'target/common/js/scripts.js': ['<banner>', '.tmp/app/common/js/scripts.js'],
                    'target/common/js/vendor.js': [
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
						'bower_components/textAngular/dist/textAngular-rangy.min.js',
						'bower_components/spin.js/spin.js',
						'bower_components/angular-spinner/angular-spinner.js',
						'bower_components/angular-file-upload/angular-file-upload.min.js',
						'bower_components/angular-toastr/dist/angular-toastr.tpls.js',
						'bower_components/angular-ui-select/dist/select.js',
						'bower_components/angular-xeditable/dist/js/xeditable.min.js',
						'bower_components/es5-shim/es5-shim.js',
						'bower_components/es5-shim/es5-sham.js',
						'bower_components/ng-idle/angular-idle.min.js'
					]
                }
            }

        },

        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= appPath %>',
                        dest: '<%= distPath %>',
                        src: [
							'favicon.ico',
							'robots.txt',
							'.htaccess',
							'*.html',
							'data/*'
						]
					},
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap/dist',
                        src: 'fonts/*',
                        dest: '<%= distPath %>'
					},
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap/dist',
                        src: 'fonts/**/*',
                        dest: '<%= distPath %>'
					},

                    {
                        expand: true,
                        cwd: 'bower_components/fontawesome',
                        src: 'fonts/*',
                        dest: '<%= distPath %>'
					},

                    {
                        expand: true,
                        cwd: '<%= appPath %>/',
                        src: 'common/fonts/*',
                        dest: '<%= distPath %>'
					},
                    {
                        expand: true,
                        cwd: '<%= appPath %>/',
                        src: 'data/*',
                        dest: '<%= distPath2 %>'
					},
                    {
                        expand: true,
                        cwd: '<%= appPath %>/',
                        src: 'common/fonts/scala/*',
                        dest: '<%= distPath %>'
					},
                    {
                        expand: true,
                        cwd: '<%= appPath %>/',
                        src: 'common/fonts/cas-webfont/*',
                        dest: '<%= distPath %>'
					},
                    {
                        expand: true,
                        cwd: '<%= appPath %>/',
                        src: 'common/img/*',
                        dest: '<%= distPath %>'
					},
                    {
                        expand: true,
                        cwd: '<%= appPath %>/',
                        src: 'common/pdf/*',
                        dest: '<%= distPath %>'
					},
                    {
                        expand: true,
                        cwd: '<%= appPath %>/',
                        src: 'common/css/ui/*',
                        dest: '<%= distPath %>'
					},
                    {
                        expand: true,
                        cwd: '<%= appPath %>/',
                        src: 'common/css/ui/images/*',
                        dest: '<%= distPath %>'
					},
                    {
                        expand: true,
                        cwd: '<%= appPath %>/',
                        src: 'images/*',
                        dest: '<%= distPath %>'
					},
                    {
                        src: '<%= appPath %>/common/js/angular-kendo.all.min.js',
                        dest: '<%= distPath %>/common/js/angular-kendo.all.min.js'
					},
                    {
                        src: '<%= appPath %>/common/js/jquery.reject.js',
                        dest: '<%= distPath %>/common/js/jquery.reject.js'
					}
				]
            }
        },
        'sails-linker': {
            app: {
                options: {
                    appRoot: '<%= appPath %>/',
                    startTag: '<!--SCRIPTS-->',
                    endTag: '<!--SCRIPTS END-->'
                },
                files: {
                    '<%= appPath %>/index.html': [
                        'app/common/js/*.js',
                        'app/components/**/*.js',
                        'app/common/js/**/*.js']

                }
            },
            dist: {
                options: {
                    startTag: '<!--PRODSCRIPTS-->',
                    endTag: '<!--PRODSCRIPTS END-->',
                    appRoot: '<%= distPath %>/'
                },
                files: {
                    '<%= distPath %>/index.html': [
                        '<%= distPath %>/common/js/vendor.js',
                        '<%= distPath %>/common/js/angular-kendo.all.min.js',
                        '<%= distPath %>/common/js/jquery.reject.js',
                        '<%= distPath %>/common/js/scripts.js'
                    ]
                }
            },
            distCss: {
                options: {
                    startTag: '<!--STYLES-->',
                    endTag: '<!--STYLES END-->',
                    fileTmpl: '<link rel="stylesheet" href="%s" />',
                    appRoot: '<%= distPath %>/'
                },
                files: {
                    '<%= distPath %>/index.html': ['<%= distPath %>/common/css/vendor.css']
                }
            }


        },
        wiredep: {
            task: {
                src: ['<%= appPath %>/index.html']
            }
        },

        run: {
            commands: {
                exec: 'cd .. && mvn clean install -Dmaven.test.skip',
            }
        }
    });


    grunt.registerTask('server', 'Compile then start a connect web server', function (target) {
        if (target === 'target') {
            grunt.task.run(['build', 'connect:dist:keepalive']);
        } else {
            grunt.task.run(['install', 'connect:app', 'watch']);
        }
    });
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.registerTask('test', ['karma']);
    grunt.registerTask('kickoff-maven', ['run']);
    grunt.registerTask('install', ['html2js', 'wiredep', 'sails-linker:app']);
    grunt.registerTask('build', ['clean:target', 'html2js', 'less', 'ngAnnotate', 'uglify', 'copy:dist', 'sails-linker:dist', 'cssmin', 'sails-linker:distCss', 'clean:tmp']);
    grunt.registerTask('default', ['server']);
};