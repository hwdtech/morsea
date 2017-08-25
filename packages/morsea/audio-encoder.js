const through2 = require('through2');
const pcm = require('pcm-util');
const audio = require('audio-buffer-utils');
const symbols = require('./symbols');

class AudioBufferEncoder {

  constructor(opts) {
    this.opts = Object.assign({
      sampleRate: 44100,
      frequency: 400,
      unitDuration: 0.2
    }, opts);

    this.buffers = {
      [symbols.DASH]: this.createOscillatorBuffer(this.opts.unitDuration * 3, this.opts.frequency),
      [symbols.DOT]: this.createOscillatorBuffer(this.opts.unitDuration, this.opts.frequency),
      [symbols.SPACE]: this.createOscillatorBuffer(this.opts.unitDuration, 0),
      'default': this.createOscillatorBuffer(0, this.opts.frequency)
    };
  }

  encode(buffer) {
    const chars = buffer.toString('utf8');

    const buffers = [];

    for (let char of chars) {
      buffers.push(this.encodeSingleChar(char, this.opts));
      buffers.push(this.createOscillatorBuffer(this.opts.unitDuration, 0))
    }

    const audioBuffer = audio.concat(...buffers);

    return Buffer.from(pcm.toArrayBuffer(audioBuffer));
  }

  encodeSingleChar(ch) {
    return (this.buffers[ch] || this.buffers['default']);
  }

  createOscillatorBuffer(duration, frequency) {
    const audioBuffer = audio.create(this.opts.sampleRate * duration, 1, this.opts.sampleRate);
    audio.fill(audioBuffer, (value, i, channel) => Math.sin(2 * Math.PI * i * frequency / this.opts.sampleRate));
    return audioBuffer;
  }
}

module.exports = {
  create(opts) {
    const audioBufferEncoder = new AudioBufferEncoder(opts);

    return through2(function (chunk, enc, cb) {
      cb(null, audioBufferEncoder.encode(chunk));
    });
  }
};
