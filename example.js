const pump = require('pump');
const { Encoder } = require('lame');
const CharStream = require('./lib/char-stream');
const TextEncoder = require('./lib/morse-text-encoder');
const AudioEncoder = require('./lib/audio-encoder');

pump(
  CharStream.create('sos'),
  TextEncoder.create(),
  AudioEncoder.create(),
  new Encoder({ bitRate: 32 }),
  process.stdout
);
