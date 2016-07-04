'use strict';
var expect = require('chai').expect;
var sinon = require('sinon');
var request = require('request');
var HUKD = require('./../index');

describe('hukd', function () {
  var api_key = 'api_key';
  var hukd;
  var options;
  var url;
  var callback;

  beforeEach(function () {
    url = 'http://api.hotukdeals.com/rest_api/v2/?key=' + api_key;
    callback = function () {};
  });

  context('when new instance created', function () {
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

    it('shuld return an object when called with valid api key', function () {
      expect(new HUKD(api_key)).to.be.an('object');
    });

    context('when get method called', function () {
      context('without options', function () {
        it('should throw Error when callback is not passed', function () {
            expect(function () {
              hukd = new HUKD(api_key);
              hukd.get();
            }).to.throw(TypeError);
        });

        it('should call request with correct url build from default options', function () {
          sinon.spy(request, 'get');

          hukd = new HUKD(api_key);
          hukd.get(callback);

          url += '&output=json&page=1';
          expect(request.get.withArgs(url).calledOnce).to.be.true;

          request.get.restore();
        });
      });

      context('with custom options', function () {
        beforeEach(function () {
          options = {
            output: 'xml',
            category: 'computers',
            order: 'hot'
          }
        });

        it('should throw Error when callback is not passed', function () {
          expect(function () {
            hukd = new HUKD(api_key);
            hukd.get(options);
          }).to.throw(TypeError);
        });

        it('should call request with correct url build from custom options', function () {
          sinon.spy(request, 'get');

          hukd = new HUKD(api_key);
          hukd.get({
            output: 'xml',
            category: 'computers',
            order: 'hot'
          }, callback);

          url += '&output=xml&category=computers&order=hot&page=1';
          expect(request.get.withArgs(url).calledOnce).to.be.true;

          request.get.restore();
        });
      });

      context('and request return an error', function () {
        it('callback should return an error', function () {
          var error = new Error('Request error');

          sinon
            .stub(request, 'get')
            .yields(error);

          hukd = new HUKD(api_key);
          hukd.get(function (err) {
            expect(err).to.be.instanceOf(Error);
          });

          request.get.restore();
        });
      });

      context('and request return status code different than 200', function () {
        it('callback should return an error', function () {
          var statusCode = 500;

          sinon
            .stub(request, 'get')
            .yields(null, {statusCode: statusCode});

          hukd = new HUKD(api_key);
          hukd.get(function (err) {
            expect(err).to.be.instanceOf(Error);
            expect(err.code).to.be.equal(statusCode);
          });

          request.get.restore();
        });
      });

      context('and request return successful response', function () {
        it('callback should return response body', function () {
          var expectedBody = {};

          sinon
            .stub(request, 'get')
            .yields(null, {statusCode: 200}, expectedBody);

          hukd = new HUKD(api_key);
          hukd.get(function (err, body) {
            expect(err).to.be.null;
            expect(body).to.be.equal(expectedBody);
          });

          request.get.restore();
        });
      });

      context('with invalid options values', function () {
        beforeEach(function () {
          hukd = new HUKD(api_key);
        });

        it('should throw TypeError when invalid output value', function () {
          expect(function () {
            hukd.get({output: 'yaml'}, callback);
          }).to.throw(TypeError);
        });

        it('should throw TypeError when invalid category value', function () {
          expect(function () {
            hukd.get({category: 'invalid'}, callback);
          }).to.throw(TypeError);
        });

        it('should throw TypeError when invalid forum value', function () {
          expect(function () {
            hukd.get({forum: 'invalid'}, callback);
          }).to.throw(TypeError);
        });

        it('should throw TypeError when invalid online_offline value', function () {
          expect(function () {
            hukd.get({online_offline: 'invalid'}, callback);
          }).to.throw(TypeError);
        });

        it('should throw TypeError when invalid order value', function () {
          expect(function () {
            hukd.get({order: 'invalid'}, callback);
          }).to.throw(TypeError);
        });

        it('should throw TypeError when page option is less than 1', function () {
          expect(function () {
            hukd.get({page: 0}, callback);
          }).to.throw(TypeError);
        });

        it('should throw TypeError when results_per_page option is less than 1', function () {
          expect(function () {
            hukd.get({results_per_page: 0}, callback);
          }).to.throw(TypeError);
        });

        it('should throw TypeError when results_per_page option is more than 30', function () {
          expect(function () {
            hukd.get({results_per_page: 31}, callback);
          }).to.throw(TypeError);
        });

        it('should throw TypeError when invalid exclude_expired value', function () {
          expect(function () {
            hukd.get({exclude_expired: null}, callback);
          }).to.throw(TypeError);
        });
      });
    });
  });
});