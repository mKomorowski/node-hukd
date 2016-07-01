'use strict';
var Validator = require('jsonschema').Validator;
var validator = new Validator();
var optionsSchema = require('./../validation/options');
var Client = require('./client');
var DEFAULT_OPTIONS = require('./constants/options');

/**
 * @param {String} API_KEY
 * @constructor
 */
function HUKD(API_KEY) {
  if (typeof API_KEY !== 'string') {
    throw new TypeError('Api key must be string type')
  }
  return {
    /**
     * @param {Object|undefined} options
     */
    get: function (options) {
      if (typeof options === 'object') {
        var validationResults = validator.validate(options, optionsSchema);

        if (validationResults.valid === false) {
          throw new TypeError(validationResults.errors[0].stack)
        }
      } else {
        options = DEFAULT_OPTIONS
      }

      return new Client(API_KEY, options);
    }
  }
}

module.exports = HUKD;
module.exports.setClient = function(client) {
  Client = client;
};
