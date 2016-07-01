'use strict';
var expect = require('chai').expect;
var sinon = require('sinon');
var HUKD = require('./../index').HUKD;
var DEFAULT_OPTIONS = require('./../src/constants/options');
var fakeClient = require('./fakes/client');

describe('hukd', function () {
  var api_key = 'api_key';
  var hukd;
  var client;
  var options;
  var spy;

  context('when new instance created', function () {
    it('should throw object when called with valid api key', function () {
      hukd = new HUKD(api_key);
      expect(hukd).to.be.an('object');
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
    context('without options', function () {
      beforeEach(function () {
        spy = {
          Client: fakeClient
        };
        client = sinon.spy(spy, 'Client');
        HUKD.setClient(client);
        hukd = new HUKD(api_key);
      });

      it('should called client with default options', function () {
        hukd.get();

        expect(client.calledWithExactly(api_key, DEFAULT_OPTIONS)).to.be.true;
      });
    });

    context('with valid options values', function () {
      beforeEach(function () {
        spy = {
          Client: fakeClient
        };
        client = sinon.spy(spy, 'Client');
        HUKD.setClient(client);
        hukd = new HUKD(api_key);
        options = {
          output: 'json',
          page: 5
        };
      });

      it('should call client once', function () {
        hukd.get(options);

        expect(client.calledOnce).to.be.true;
      });

      it('should call client with correct api key and options', function () {
        hukd.get(options);

        expect(client.calledWithExactly(api_key, options)).to.be.true;
      });

      it('should return instance of client', function () {
        expect(hukd.get(options)).to.be.an.instanceof(client);
      });
    });

    context('with invalid options values', function () {
      beforeEach(function () {
        hukd = new HUKD(api_key);
      });

      it('should throw TypeError when invalid output value', function () {
        expect(function () {
          hukd.get({output: 'yaml'});
        }).to.throw(TypeError);
      });

      it('should throw TypeError when invalid category value', function () {
        expect(function () {
          hukd.get({category: 'invalid'});
        }).to.throw(TypeError);
      });

      it('should throw TypeError when invalid forum value', function () {
        expect(function () {
          hukd.get({forum: 'invalid'});
        }).to.throw(TypeError);
      });

      it('should throw TypeError when invalid online_offline value', function () {
        expect(function () {
          hukd.get({online_offline: 'invalid'});
        }).to.throw(TypeError);
      });

      it('should throw TypeError when invalid order value', function () {
        expect(function () {
          hukd.get({order: 'invalid'});
        }).to.throw(TypeError);
      });

      it('should throw TypeError when page option is less than 1', function () {
        expect(function () {
          hukd.get({page: 0});
        }).to.throw(TypeError);
      });

      it('should throw TypeError when results_per_page option is less than 1', function () {
        expect(function () {
          hukd.get({results_per_page: 0});
        }).to.throw(TypeError);
      });

      it('should throw TypeError when results_per_page option is more than 30', function () {
        expect(function () {
          hukd.get({results_per_page: 31});
        }).to.throw(TypeError);
      });

      it('should throw TypeError when invalid exclude_expired value', function () {
        expect(function () {
          hukd.get({exclude_expired: null});
        }).to.throw(TypeError);
      });
    })
  });
});