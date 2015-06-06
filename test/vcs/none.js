'use strict';

/**
 * Filter a list of file paths to return none.
 *
 * @param {Array.<string>} paths
 *     A list of file paths.
 * @param {function(Err, Array.<string>)} cb
 *     Callback called with any error and a list of files that have been
 *     approved as "staged".
 */
var filterStagedPaths = exports.filterStagedPaths = function(paths, cb) {
  cb(null, []);
};

