'use strict';

var grunt = require('grunt');
var expect = require('chai').expect;
var filter = require('../lib/filter');

describe('VCS Filter', function() {
  it('should match files with src and dest, matching on src value', function(done) {
    filter.filterFiles([ {src: [ 'a' ], dest: 'a' } ], require('./vcs/a'), function(err, staged) {
      expect(staged.length).to.equal(1);
      expect(staged[0].src.length).to.equal(1);
      expect(staged[0].src[0]).to.equal('a');
      done();
    });
  });
  it('should not match files with different src and dest values', function(done) {
    filter.filterFiles([ {src: [ 'a' ], dest: 'b' } ], require('./vcs/a'), function(err, staged) {
      expect(staged.length).to.equal(0);
      done();
    });
  });
  it('should not match files with different multiple src and a dest value', function(done) {
    filter.filterFiles([ {src: [ 'a', 'a2' ], dest: 'a' } ], require('./vcs/a'), function(err, staged) {
      expect(staged.length).to.equal(0);
      done();
    });
  });
  it('should filter out all but the first file in a file set with vcs "first"', function(done) {
    filter.filterFiles([ {src: [ 'a', 'b', 'c' ] } ], require('./vcs/a'), function(err, staged) {
      expect(staged[0].src[0]).to.equal('a');
      done();
    });
  });
  it('should return empty array if no files match', function(done) {
    filter.filterFiles([ {src: [ 'a', 'b', 'c' ] } ], require('./vcs/none'), function(err, staged) {
      expect(staged).to.deep.equal([]);
      done();
    });
  });
  it('should filter multiple src files', function(done) {
    filter.filterFiles([ {src: [ 'a', 'b', 'c' ]}, {src: [ 'a2', 'b2', 'c2' ]} ], require('./vcs/a'), function(err, staged) {
      expect(staged[0].src).to.deep.equal([ 'a' ]);
      expect(staged[1].src).to.deep.equal([ 'a2' ]);
      done();
    });
  });

});
