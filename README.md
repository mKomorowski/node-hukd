Hot UK Deals NodeJS client
=====================
[![Build Status](https://travis-ci.org/mKomorowski/node-hukd.svg?branch=master)](https://travis-ci.org/mKomorowski/node-hukd)

JavaScript Hot UK Deals client

You can apply for a api key [here](http://www.hotukdeals.com/rest-api)
## Installation
```
npm install hukd
```

## Usage
```javascript
const hukd = require('api_key');
```
## hukd.get([options], callback)
```javascript
hukd.get(function(err, data) {
    console.log(data);
}
```

Optionally you can specify output format (default is JSON) and filter results

```javascript
hukd.get({output: 'xml', category: 'travel'}, function(err, data) {
    console.log(data);
}
```