/**
 * Created by LamDo on 7/4/15.
 */
'use strict';
module.exports = function(grunt) {

    grunt.initConfig({

        clean: ['build'],

        concat: {
            dist: {
                dest: 'build/mimi.js',
                src: [  'src/**/*.js']
            }
        },


        jshint: {
            files: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                globals: {
                }
            }
        },
        watch: {
            options: {
                livereload: false
            },
            src: {
                files: ['src/**/*.js'],
                tasks: ['clean', 'concat']
            },
            test: {
                files: ['test/**/*.tests.js'],
                tasks: ['jasmine']
            }
        },
        jasmine: {
            all: {
                src: [
                    'build/**/*.js',
                ],
                options: {
                    'vendor': '',
                    'specs': 'test/**/*.js'
                }
            },
            pivotal: {
                src: 'build/mimi.js',
                options: {
                    specs: '<%= jasmine.all.options.specs %>',
                    helpers: 'test/*.helper.js'
                }
            },
            istanbul: {
                src: '<%= jasmine.all.src %>',
                options: {
                    vendor: '<%= jasmine.all.options.vendor %>',
                    specs: '<%= jasmine.all.options.specs %>',
                    template: require('grunt-template-jasmine-istanbul'),
                    templateOptions: {
                        coverage: 'coverage/json/coverage.json',
                        report: [
                            { type: 'html', options: {dir: 'coverage/html'}},
                            { type: 'lcov', options: {dir: 'coverage/lcov'}},
                            {type: 'text-summary'}
                        ]
                    }
                }
            }
        },

        'http-server': {

            'dev': {
                root: '.',
                port: function() {
                    return 8282;
                },
                host: "0.0.0.0",
                cache: 1,
                showDir: true,
                autoIndex: true,
                ext: "html",
                runInBackground: false
            }
        }


    });

    grunt.loadNpmTasks('grunt-http-server');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('travis', ['clean','concat', 'jasmine:istanbul']);
    grunt.registerTask('dev', ['clean', 'concat', 'watch:src']);
    grunt.registerTask('default', ['jasmine', 'watch']);

};