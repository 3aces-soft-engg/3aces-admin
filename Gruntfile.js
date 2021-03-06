'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserSync: {
            bsFiles: {
                src: [
                    'assets/html/*.html',
                    'assets/css/*.css',
                    'assets/js/*.js',
                ],
            },
            options: {
                watchTask: true,
                server: './assets'
            }
        },
        compass: {
            dist: {
                options: {
                    sassDir: 'assets/sass',
                    cssDir: 'assets/css',
                    outputStyle: 'compressed'
                }
            },
            task: ['watch']
        },
        watch: {
            options: {
                livereload: true
            },
            html: {
                files: ['assets/html/*.html'],
            },
            css: {
                files: [
                    'assets/sass/*.sass'
                ],
                tasks: ['compass']
            },
            scripts: {
                files: [
                    'assets/js/*.js',
                    'Gruntfile.js'
                ],
                tasks: ['jshint', 'concat', 'uglify'],
                options: {
                    interrupt: true
                }
            }
        },
        qunit: {
            files: ['app/tests/*']
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: ['Gruntfile.js', 'assets/js/*.js']
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['assets/js/*.js'],
                dest: 'dist/build.js'
            },
            task: ['watch']
        },
        uglify: {
            options: {
                // banner: '/* <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/build.min.js': ['<%= concat.dist.dest %>']
                }
            },
            task: ['watch']
        },
        
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-notify');
    
    grunt.registerTask('default', ['browserSync', 'concat', 'qunit', 'uglify', 'compass', 'watch']);
};