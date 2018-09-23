/*
 * grunt-cache-cdn
 * https://github.com/cmplank/grunt-cache-cdn
 *
 * Copyright (c) 2018 Colin Plank
 * Licensed under the MIT license.
 */

'use strict';

const cacheCdn = require("../cacheCdn");

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  let description = ```Download cdn libraries for local use (e.g. unit tests).
  Define your cdn libs in one place and write the references into your html.```;

  grunt.registerMultiTask('cache_cdn', description, function () {

    var gruntDone = this.async();

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: '\n'
    });

    // Iterate over all specified file groups.
    var gruntCdnPromises = this.files.map(function (f) {

      if (f.src.length === 0) {
        grunt.fail.warn('grunt-cache-cdn does not have a src file configured. '
          + ' Please update your file config.');
      } else if (f.src.length > 1) {
        grunt.fail.warn('grunt-cache-cdn does not support multiple source files '
          + 'per destination. Please update your file config.');
      }

      var filepath = f.src[0];
      // Warn on and remove invalid source files (if nonull was set).
      if (!grunt.file.exists(filepath)) {
        grunt.fail.warn('Source file "' + filepath + '" not found.');
      }

      // Call cacheCdn
      return cacheCdn(options({
        source: src,
        sourceFile: undefined, // Don't use this even if set
        destinationFile = f.dest
      }));
    });

    Promise
      .all(gruntCdnPromises)
      .then(function () {
        grunt.log.writeln('cache-cdn finished');
        gruntDone();
      })
      .catch(function(error) {
        gruntDone(error);
      });
  });

};
