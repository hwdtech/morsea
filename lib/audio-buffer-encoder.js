const through2 = require('through2');
const audioBufferUtils = require('audio-buffer-utils');
const symbols = require('./symbols');

function createAudioBuffer(duration, frequency, sampleRate) {
  const audioBuffer = audioBufferUtils.create(sampleRate * duration, 1, sampleRate);
  audioBufferUtils.fill(audioBuffer, (value, i, channel) => Math.sin(2 * Math.PI * i * frequency / sampleRate));
  return audioBuffer;
}

const handlers = {
  [symbols.DASH]: opts => createAudioBuffer(opts.unitDuration * 3, opts.frequency, opts.sampleRate),
  [symbols.DOT]: opts => createAudioBuffer(opts.unitDuration, opts.frequency, opts.sampleRate),
  [symbols.SPACE]: opts => createAudioBuffer(opts.unitDuration, 0, opts.sampleRate),
  'default': opts => createAudioBuffer(0, opts.frequency, opts.sampleRate)
};

function createAudioBufferFromChar(ch, opts) {
  return (handlers[ch] || handlers['default'])(opts);
}

module.exports = {
  create(opts) {
    opts = Object.assign({
      frequency: 400,
      unitDuration: 0.2,
      sampleRate: 44100
    }, opts);

    return through2.obj(function (char, enc, cb) {
      this.push(createAudioBufferFromChar(char.toString(), opts));
      this.push(createAudioBuffer(opts.unitDuration, 0, opts.sampleRate));
      cb();
    });
  }
};
