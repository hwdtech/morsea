'use strict';

const { promisify } = require('util');
const { RateLimiter } = require('limiter');

const limiter = new RateLimiter(200, 'hour');
const removeToken = promisify(limiter.removeTokens.bind(limiter));

module.exports = () => {
  if (process.env.NODE_ENV === 'production') {
    return removeToken();
  }

  return Infinity;
};
