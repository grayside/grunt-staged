/*
 * grunt-staged
 * https://github.com/grayside/grunt-staged
 *
 * Copyright (c) 2015 Adam "Grayside" Ross
 * Licensed under the MIT license.
 */

'use strict';

/**
 * Large swathes of this Copyright (c) 2015 the grunt-newer team.
 *
 * @see https://github.com/tschaub/grunt-newer
 */
function createTask(grunt) {
  return function(taskName, targetName) {
    var tasks = [];
    var prefix = this.name;
    if (!targetName) {
      if (!grunt.config(taskName)) {
        grunt.fatal('The "' + prefix + '" prefix is not supported for aliases');
        return;
      }
      // Expand multi-tasks to handle each target individually.
      Object.keys(grunt.config(taskName)).forEach(function(targetName) {
        if (!/^_|^options$/.test(targetName)) {
          tasks.push(prefix + ':' + taskName + ':' + targetName);
        }
      });

      return grunt.task.run(tasks);
    }
    var args = Array.prototype.slice.call(arguments, 2).join(':');
    var options = this.options({
      vcs: "git",
    });

    var done = this.async();

    var originalConfig = grunt.config.get([taskName, targetName]);
    var config = grunt.util._.clone(originalConfig);

    /**
     * Special handling for tasks that expect the `files` config to be a string
     * or array of string source paths.
     */
    var srcFiles = true;
    if (typeof config.files === 'string') {
      config.src = [config.files];
      delete config.files;
      srcFiles = false;
    } else if (Array.isArray(config.files) &&
        typeof config.files[0] === 'string') {
      config.src = config.files;
      delete config.files;
      srcFiles = false;
    }

    var files = grunt.task.normalizeMultiTaskFiles(config, targetName);

    require('../lib/filter').filterFiles(files, require('../lib/vcs/' + options.vcs), function(err, stagedFiles) {
      if (err) {
        return done(err);
      }
      else if (stagedFiles.length === 0) {
        grunt.log.writeln('No staged files to process.');
        return done();
      }

      /**
       * If we started out with only src files in the files config,
       * transform the newerFiles array into an array of source files.
       */
      if (!srcFiles) {
        stagedFiles = stagedFiles.map(function(obj) {
          return obj.src;
        });
      }

      // configure target with only newer files
      config.files = stagedFiles;
      delete config.src;
      delete config.dest;
      grunt.config.set([taskName, targetName], config);

      // run the task, and attend to postrun tasks
      var qualified = taskName + ':' + targetName;
      var tasks = [
        qualified + (args ? ':' + args : '')
      ];
      grunt.task.run(tasks);

      done();
    });
  };
}

module.exports = function(grunt) {
  grunt.registerTask(
    'staged', 'Run grunt tasks with only those source files ' +
    'staged for code commit.', createTask(grunt));
};
