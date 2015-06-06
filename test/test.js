'use strict';

var grunt = require('grunt');
var expect = require('chai').expect;
var filter = require('../lib/filter');

describe('VCS Filter', function() {
  it('should filter out all but the first file in a file set with vcs "first"', function(done) {
    filter.filterFiles([ {src: [ 'a', 'b', 'c' ] } ], require('./vcs/first'), function(err, staged) {
      expect(staged[0].src).to.equal('a');
      done();
    });
  });
  it('should return no files with vcs "none"', function(done) {
    filter.filterFiles([ {src: [ 'a', 'b', 'c' ] } ], require('./vcs/none'), function(err, staged) {
      expect(staged).to.deep.equal([]);
      done();
    });
  });
  it('should not collapse file objects', function(done) {
    filter.filterFiles([ {src: [ 'a', 'b', 'c' ]}, {src: [ 'a2', 'b2', 'c2' ]} ], require('./vcs/first'), function(err, staged) {
      expect(staged[0].src).to.deep.equal('a');
      expect(staged[1].src).to.deep.equal('a2');
      done();
    });
  });

});
