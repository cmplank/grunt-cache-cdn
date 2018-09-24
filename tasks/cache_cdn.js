/*
 * grunt-cache-cdn
 * https://github.com/cmplank/grunt-cache-cdn
 *
 * Copyright (c) 2018 Colin Plank
 * Licensed under the MIT license.
 */

'use strict';

const cacheCdn = require("cache-cdn");

module.exports = function (grunt) {

  let description = 'Download cdn libraries for local use (e.g. unit tests). '
    + 'Define your cdn libs in one place and write the references into your html.';

  grunt.registerMultiTask('cache_cdn', description, function () {

    var gruntDone = this.async();
    var options = this.options;

    // Iterate over all specified file groups.
    var gruntCdnPromises = this.files.map(function (f) {

      if (f.src.length === 0) {
        grunt.fail.warn('grunt-cache-cdn does not have a src file configured. '
          + ' Please update your file config.');
      } else if (f.src.length > 1) {
        grunt.fail.warn('grunt-cache-cdn does not support multiple source files '
          + 'per destination. Please update your file config.');
      }

      var srcFilepath = f.src[0];
      // Warn on and remove invalid source files (if nonull was set).
      if (!grunt.file.exists(srcFilepath)) {
        grunt.fail.warn('Source file "' + srcFilepath + '" not found.');
      }

      // Merge task-specific and/or target-specific options with these defaults.
      var optionsForFile = options({
        sourceFile: srcFilepath,
        destinationFile: f.dest
      });

      return cacheCdn(optionsForFile);
    });

    Promise
      .all(gruntCdnPromises)
      .then(function () {
        grunt.log.writeln('cache-cdn finished');
        gruntDone();
      })
      .catch(function (error) {
        gruntDone(error);
      });
  });

};
