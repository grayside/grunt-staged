'use strict';

var _ = require('lodash');

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
 *     VCS plugin that provides a filterFiles function accepting a
 *     callback of what to do with a changed list.
 * @param {function(Error, Array.<Object>)} cb
 *     Callback called with modified file config objects. Objects with no more
 *     src files are filtered from the results.
 */
var filterFiles = exports.filterFiles = function(files, vcs, cb) {
  vcs.getStagedPaths(function (err, paths) {
    if (err) {
      return cb(err);
    }

    var stagedFiles = [];

    _.each(files, function (file) {
      // Ignore multi-source files with a destination
      if (file.dest && (file.src.length !== 1 || file.dest !== file.src[0])) {
        return;
      }

      // Find all matched paths in the src array
      var matchedPaths = file.src.filter(function (path) {
        return paths.indexOf(path) > -1;
      });

      // If there are matches, return only the matched paths
      if (matchedPaths.length) {
        file.src = matchedPaths;
        stagedFiles.push(file);
      }
    });

    return cb(null, stagedFiles);
  });
};
