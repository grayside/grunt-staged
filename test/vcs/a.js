'use strict';

/**
 * Filter a list of file paths to only return 'a' file paths.
 *
 * @param {function(Err, Array.<string>)} cb
 *     Callback called with any error and a list of files that are "staged".
 */
var filterStagedPaths = exports.getStagedPaths = function(cb) {
  cb(null, [ 'a', 'a2' ]);
};

