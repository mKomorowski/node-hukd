'use strict';
var Validator = require('jsonschema').Validator;
var validator = new Validator();
var request = require('request');
var optionsSchema = require('./../validation/options');

var API = require('./constants/api');
var DEFAULT_OPTIONS = require('./constants/options');

/**
 * @param {String} url
 * @param {Object} params
 * @returns {String}
 */
function _buildUrl (url, params) {
  for (var key in params) {
    url += '&' + String(key) + '=' + String(params[key]);
  }

  return url;
}

/**
 * @param {String} API_KEY
 * @constructor
 */
function HUKD (API_KEY) {
  if (typeof API_KEY !== 'string') {
    throw new TypeError('Api key must be string type')
  }

  return {
    get: function(options) {
      if(!arguments.length || typeof arguments[arguments.length - 1] !== 'function') {
        throw new TypeError('callback is not specified');
      }

      var callback = arguments[arguments.length - 1];

      if (typeof options === 'object') {
        var validationResults = validator.validate(options, optionsSchema);

        if (validationResults.valid === false) {
          throw new TypeError(validationResults.errors[0].stack)
        }
      } else {
        options = DEFAULT_OPTIONS;
      }

      if(typeof options.page === 'undefined') {
        options.page = API.start_page;
      }

      var path = API.url + '?key=' + API_KEY;
      var url = _buildUrl(path, options);
      var requestOptions = {};

      if(options.outpout == 'json') {
        requestOptions = {
          headers: {
            'Content-Type': 'application/xml'
          }
        }
      } else {
        requestOptions.json = true;
      }

      request.get(url, requestOptions, function (err, response, body) {
        if(err) {
          return callback(err);
        }

        if(response.statusCode !== 200) {
          var error = new Error('HUKD API responded with code ' + response.statusCode);
          error.code = response.statusCode;

          return callback(error);
        }

        return callback(null, body);
      });
    }
  }
}

module.exports = HUKD;