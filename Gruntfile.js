/**
 * Created by LamDo on 7/4/15.
 */
'use strict';
module.exports = function(grunt) {

    grunt.initConfig({
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                globals: {
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        },
        jasmine: {
            pivotal: {
                src: 'mimi.js',
                options: {
                    specs: 'test/*.tests.js',
                    helpers: 'test/*.helper.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.registerTask('default', ['jshint']);

};