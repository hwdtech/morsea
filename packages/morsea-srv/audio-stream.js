'use strict';

const pump = require('pump');
const { CharStream, TextEncoder, AudioEncoder } = require('morsea');

module.exports = function (text) {
  return pump(
    CharStream.create(text),
    TextEncoder.create(),
    AudioEncoder.create({
      frequency: 700,
      unitDuration: 0.1,
      sampleRate: 48000
    })
  );
};
