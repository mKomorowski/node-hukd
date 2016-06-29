'use strict'
var expect = require('chai').expect;
var HUKD = require('./../index');

describe('hukd', function () {
  context('when new instance created', function () {
    it('should return object when called with valid api key', function () {
      var hhuk = new HUKD('api_key');
      expect(hhuk).to.be.an('object');
    });

    it('should return TypeError when called without api key', function() {
      expect(function () {
        var hhuk = new HUKD;
      }).to.throw(TypeError);
    });

    it('should return TypeError when called with invalid api key', function() {
      expect(function () {
        var hhuk = new HUKD(123);
      }).to.throw(TypeError);
    });
  })
});