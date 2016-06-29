'use strict'
function Client () {

}

function HUKD (API_KEY) {
  if (typeof API_KEY !== 'string') {
    throw new TypeError('Api key must be string type')
  }
  return {
    get: function (options) {

    }
  }
}

module.exports = HUKD
