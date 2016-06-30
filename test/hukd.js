'use strict';
var expect = require('chai').expect;
var HUKD = require('./../index').HUKD;

describe('hukd', function () {
  var hhuk;

  context('when new instance created', function () {
    it('should throw object when called with valid api key', function () {
      hhuk = new HUKD('api_key');
      expect(hhuk).to.be.an('object');
    });

    it('should throw TypeError when called without api key', function () {
      expect(function () {
        new HUKD;
      }).to.throw(TypeError);
    });

    it('should throw TypeError when called with invalid api key', function () {
      expect(function () {
        new HUKD(123);
      }).to.throw(TypeError);
    });
  });

  context('when get method called', function () {
    beforeEach(function () {
      hhuk = new HUKD('api_key');
    });

    context('with invalid options values', function () {
      it('should throw TypeError when invalid output value', function () {
        expect(function () {
          hhuk.get({output: 'yaml'});
        }).to.throw(TypeError);
      });

      it('should throw TypeError when invalid category value', function () {
        expect(function () {
          hhuk.get({category: 'invalid'});
        }).to.throw(TypeError);
      });

      it('should throw TypeError when invalid forum value', function () {
        expect(function () {
          hhuk.get({forum: 'invalid'});
        }).to.throw(TypeError);
      });

      it('should throw TypeError when invalid online_offline value', function () {
        expect(function () {
          hhuk.get({online_offline: 'invalid'});
        }).to.throw(TypeError);
      });

      it('should throw TypeError when invalid order value', function () {
        expect(function () {
          hhuk.get({order: 'invalid'});
        }).to.throw(TypeError);
      });

      it('should throw TypeError when page option is less than 1', function () {
        expect(function () {
          hhuk.get({page: 0});
        }).to.throw(TypeError);
      });

      it('should throw TypeError when results_per_page option is less than 1', function () {
        expect(function () {
          hhuk.get({results_per_page: 0});
        }).to.throw(TypeError);
      });

      it('should throw TypeError when results_per_page option is more than 30', function () {
        expect(function () {
          hhuk.get({results_per_page: 31});
        }).to.throw(TypeError);
      });

      it('should throw TypeError when invalid exclude_expired value', function () {
        expect(function () {
          hhuk.get({exclude_expired: null});
        }).to.throw(TypeError);
      });
    })
  });
});