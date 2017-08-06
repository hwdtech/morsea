const pump = require('pump');
const { Encoder } = require('lame');
const CharStream = require('../char-stream');
const TextEncoder = require('../text-encoder');
const AudioEncoder = require('../audio-encoder');

pump(
  CharStream.create('sos'),
  TextEncoder.create(),
  AudioEncoder.create(),
  new Encoder({ bitRate: 32 }),
  process.stdout
);
