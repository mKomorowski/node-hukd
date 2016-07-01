'use strict';
var Validator = require('jsonschema').Validator;
var validator = new Validator();
var optionsSchema = require('./../validation/options');
var Client = require('./client');
var DEFAULT_OPTIONS = {
  output: 'json',
  page: 1
};

function HUKD(API_KEY) {
  if (typeof API_KEY !== 'string') {
    throw new TypeError('Api key must be string type')
  }
  return {
    get: function (options) {
      if (typeof options === 'object') {
        var validationResults = validator.validate(options, optionsSchema);

        if (validationResults.valid === false) {
          throw new TypeError(validationResults.errors[0].stack)
        }
      } else {
        options = DEFAULT_OPTIONS
      }
      console.log('hehrhe');
      return new Client(API_KEY, options);
    }
  }
}

module.exports = HUKD;
module.exports.setClient = function(client) {
  Client = client;
};
