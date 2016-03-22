'use strict';

var sgf = require("staged-git-files");
var _ = require('lodash');

/**
 * Gets a list of file paths with staged status.
 *
 * @param {function(<Error>, Array.<string>)} cb
 *     Callback called with any error and a list of files that are "staged".
 */
var getStagedPaths = exports.getStagedPaths = function(cb) {
  sgf(function (err, results) {
    if (err) {
      return cb(err);
    }

    return cb(null, _.pluck(results, 'filename'));
  });
};
