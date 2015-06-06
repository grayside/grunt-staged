'use strict';

var async = require('async');

/**
 * Filter a list of file config objects by staged status.
 *
 * Source files on the provided objects are removed if they
 * have not been staged according to the configured VCS system.
 *
 * @param {Array.<Object>} files
 *     A list of Grunt file config objects.  These
 *     are returned from `grunt.task.normalizeMultiTaskFiles` and have a src
 *     property (Array.<string>) and an optional dest property (string).
 * @param {<Object>} vcs
 *     VCS plugin that provides a filterStagedPaths function accepting a list
 *     of paths and a callback of what to do with a changed list.
 * @param {function(Error, Array.<Object>)} cb
 *     Callback called with modified file config objects. Objects with no more
 *     src files are filtered from the results.
 */
var filterFiles = exports.filterFiles = function(files, vcs, cb) {
  async.map(files, function(obj, done) {
    if (obj.dest && !(obj.src.length === 1 && obj.dest === obj.src[0])) {
      vcs.filterStagedPaths(obj.src, function(err, any) {
        done(err, any && obj);
      });
    }
    else {
      vcs.filterStagedPaths(obj.src, function(err, src) {
        done(err, {src: src, dest: obj.dest});
      });
    }
  }, function(err, results) {
    if (err) {
      return cb(err);
    }
    // get rid of file config objects with no src files
    cb(null, results.filter(function(obj) {
      return obj && obj.src && obj.src.length > 0;
    }));
  });
};
