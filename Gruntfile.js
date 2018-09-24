/*
 * grunt-cache-cdn
 * https://github.com/cmplank/grunt-cache-cdn
 *
 * Copyright (c) 2018 Colin Plank
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporterOutput: ''
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp', 'cdn-lock.json']
    },

    // Configuration to be run (and then tested).
    cache_cdn: {
      default_options: {
        options: {},
        files: {
          'tmp/index.html': ['test/test-resources/index.html']
        }
      },
      configfile_options: {
        options: {
          configFile: 'test/test-resources/other-cdn.json'
        },
        files: {
          'tmp/index.html': ['test/test-resources/index.html']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'cache_cdn', 'nodeunit', 'clean']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
