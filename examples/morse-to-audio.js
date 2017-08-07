/**
 * Usage node examples/morse-to-audio | aplay -f cd
 */
const pump = require('pump');
const CharStream = require('../char-stream');
const TextEncoder = require('../text-encoder');
const AudioEncoder = require('../audio-encoder');

const audioEncoder = AudioEncoder.create();

pump(
  CharStream.create('d'),
  TextEncoder.create(),
  audioEncoder,
  process.stdout
);
