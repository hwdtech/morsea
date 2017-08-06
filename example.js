const pump = require('pump');
const fs = require('fs');
const { Encoder } = require('lame');
const AudioThrough = require('audio-through');
const CharStream = require('./lib/char-stream');
const TextEncoder = require('./lib/morse-text-encoder');
const AudioBufferEncoder = require('./lib/audio-buffer-encoder');

pump(
  CharStream.create('sos'),
  TextEncoder.create(),
  AudioBufferEncoder.create(),
  new AudioThrough(),
  new Encoder({ bitRate: 32 }),
  fs.createWriteStream('./test.mp3')
);
