'use strict';

const pump = require('pump');
const ogg = require('ogg');
const opus = require('node-opus');
const error = require('debug')('ogg-encoder');

function log(err) {
  if (err) {
    error(err.message);
  }
}

module.exports = function(input, output) {
  const opusEncoder = new opus.Encoder();
  const oggEncoder = new ogg.Encoder();

  pump(oggEncoder, output, log);
  pump(input, opusEncoder, oggEncoder.stream(), log);
};
