'use strict';

const qs = require('querystring');
const url = require('url');

module.exports = function(req) {
  const query = qs.parse(url.parse(req.url).query) || {};
  return query.message;
};
