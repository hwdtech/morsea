/**
 * Usage node examples/morse-to-ogg > test.ogg
 */
const ogg = require('ogg');
const opus = require('node-opus');
const pump = require('pump');
const CharStream = require('../char-stream');
const TextEncoder = require('../text-encoder');
const AudioEncoder = require('../audio-encoder');

const oggEncoder = new ogg.Encoder();

pump(oggEncoder, process.stdout);

pump(
  CharStream.create('sos'),
  TextEncoder.create(),
  AudioEncoder.create(),
  new opus.Encoder(48000, 2),
  oggEncoder.stream()
);
