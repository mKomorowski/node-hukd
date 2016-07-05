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
const HUKD = require('hukd');

const hukd = new HUKD('api_key');
```
## hukd.get([options], callback)
```javascript
hukd.get(function(err, data) {
    console.log(data);
}
```

Optionally you can specify page number (results are paginated), output format (default is JSON) and filter results

```javascript
hukd.get({output: 'xml', category: 'travel'}, function(err, data) {
    console.log(data);
}
```

Full lists of options:
- output - This parameter is used to determine what type of output you would like to receive in the response. Omitting this parameter will default to xml output. Currently the possible options are: json, xml
- page - This parameter, along with the results_per_page parameter allows you to paginate your results. You pass it the page number of the page you would like to view, so for example, "2" would give you the second set of results for a given filter configuration. (Note: Only the first 1000 results of any filter will be accessible).
- category - This parameter is used to determine what category you would like to see deals from. It uses the special "url name" for the different categories. Omitting this parameter will default to all deals. The possible options are: computers, audiovisual, entertainment, fashion, home, mobiles, travel, groceries, kids, other-deals, gaming, restaurant
- forum - This parameter is used to determine what forum you would like to see deals from. It uses the special "url name" for the forums. Omitting this parameter will default to all deals. The possible options are: all, deals, vouchers, freebies, competitions, deal-requests, for-sale-trade, misc, and feedback
- online_offline - This parameter allows you to filter between online and offline deals. Omitting this parameter will default to all deals. The possible values are: online, offline. - order - This parameter determines the order the deals are returned in. There are 3 possible options: new, discussed, hot
- results_per_page - This parameter allows you to specify how many deals per request you would like returned. This value is limited to a maximum of 30 deals per request. The default is 20.
- exclude-expired - This parameter allows you to prevent expired deals from being returned.Set to true to exclude expired deals.

```javascript
const options = {
    output: 'json',
    page: 1,
    category: 'computers',
    forum: 'deals',
    online_offline: 'online',
    order: 'order',
    results_per_page: 20,
    exclude_expired: true
}

hukd.get(options, function(err, data) {
    console.log(data);
}
```