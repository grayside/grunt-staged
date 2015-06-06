/*
 * grunt-staged
 * https://github.com/grayside/grunt-staged
 *
 * Copyright (c) 2015 Adam "Grayside" Ross
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        'lib/**/*.js',
        'test/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },

    // Unit tests.
    test: {
      all: {
        options: {
          reporter: 'spec'
        },
        src: 'test/*.js'
      },
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  grunt.renameTask('mochaTest', 'test');
  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
