'use strict';

var sgf = require("staged-git-files");
var _ = require('lodash');

/**
 * Filter a list of file paths by staged status.
 *
 * Source files on the provided objects are removed if they are not
 * staged in git.
 *
 * @param {Array.<string>} paths
 *     A list of file paths.
 * @param {function(Err, Array.<string>)} cb
 *     Callback called with any error and a list of files that have been
 *     approved as "staged".
 */
var filterStagedPaths = exports.filterStagedPaths = function(paths, cb) {
  sgf(function(err, results) {
    results = _.pluck(results, 'filename');
    cb(null, _.intersection(paths, results));
  });
};

