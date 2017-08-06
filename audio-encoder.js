const audioBufferUtils = require('audio-buffer-utils');
const AudioThrough = require('audio-through');
const symbols = require('./symbols');

class AudioEncoder extends AudioThrough {
  static create(opts) {
    opts = Object.assign({
      frequency: 400,
      unitDuration: 0.2
    }, opts);

    return new AudioEncoder(opts);
  }

  constructor(opts) {
    super(opts);

    this.handlers = {
      [symbols.DASH]: () => this.createOscillatorBuffer(this.unitDuration * 3, this.frequency),
      [symbols.DOT]: () => this.createOscillatorBuffer(this.unitDuration, this.frequency),
      [symbols.SPACE]: () => this.createOscillatorBuffer(this.unitDuration, 0),
      'default': () => this.createOscillatorBuffer(0, this.frequency)
    }
  }

  _process(buffer, cb) {
    super._process(this.prepareBuffer(buffer), cb);
  }

  prepareBuffer(ch) {
    return audioBufferUtils.concat([
      this.encodeSingleChar(ch.toString(), this),
      this.createOscillatorBuffer(this.unitDuration, 0)
    ]);
  }

  encodeSingleChar(ch) {
    return (this.handlers[ch] || this.handlers['default'])();
  }

  createOscillatorBuffer(duration, frequency) {
    const audioBuffer = audioBufferUtils.create(this.format.sampleRate * duration, 1, this.format.sampleRate);
    audioBufferUtils.fill(audioBuffer, (value, i, channel) => Math.sin(2 * Math.PI * i * frequency / this.format.sampleRate));
    return audioBuffer;
  }
}

module.exports = AudioEncoder;
