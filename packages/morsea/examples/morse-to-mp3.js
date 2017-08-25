/**
 * Usage node examples/morse-to-mp3 > test.mp3
 */
const pump = require('pump');
const lame = require('lame');
const CharStream = require('../char-stream');
const TextEncoder = require('../text-encoder');
const AudioEncoder = require('../audio-encoder');

pump(
  CharStream.create('sos'),
  TextEncoder.create(),
  AudioEncoder.create(),
  new lame.Encoder({ bitRate: 32 }),
  process.stdout
);
