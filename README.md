# grunt-staged

> Run grunt tasks with only those source files staged for code commit.

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-staged --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-staged');
```

## The "staged" task

The staged task doesn't require any special configuration. To use it, just add `staged` as the first argument when running other tasks.

This command is heavily based on [grunt-newer](https://github.com/tschaub/grunt-newer), except it determines
which files should be handled based on git staging.

## Use Case

This task is best used when you want to make sure a set of discrete changes is
processed, but do not want to include other changes in your operations.

## VCS Support

* git

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## License
Copyright (c) 2015 Adam "Grayside" Ross. Licensed under the MIT license.
