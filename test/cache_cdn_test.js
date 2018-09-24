'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

const MSG_FILE_EXISTS = 'The file should have been downloaded';

exports.cache_cdn = {
  setUp: function(done) {
    done();
  },
  default_options: function(test) {
    test.expect(4);

    var actual = grunt.file.read('tmp/index.html');
    var expected = grunt.file.read('test/expected/index.html');
    test.equal(actual, expected, 'index.html files should match.');

    test.ok(grunt.file.exists('tmp/css/bootstrap.min.css'), MSG_FILE_EXISTS);
    test.ok(grunt.file.exists('tmp/js/jquery.min.js'), MSG_FILE_EXISTS);
    test.ok(grunt.file.exists('tmp/js/jquery2.min.js'), MSG_FILE_EXISTS);

    test.done();
  },
  configfile_options: function(test) {
    test.expect(4);

    var actual = grunt.file.read('tmp/index.html');
    var expected = grunt.file.read('test/expected/index.html');
    test.equal(actual, expected, 'index.html files should match.');

    test.ok(grunt.file.exists('tmp/css2/bootstrap.min.css'), MSG_FILE_EXISTS);
    test.ok(grunt.file.exists('tmp/js2/jquery.min.js'), MSG_FILE_EXISTS);
    test.ok(grunt.file.exists('tmp/js2/jquery2.min.js'), MSG_FILE_EXISTS);

    test.done();
  },
};
