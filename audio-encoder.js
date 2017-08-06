const audioBufferUtils = require('audio-buffer-utils');
const AudioThrough = require('audio-through');
const symbols = require('./symbols');

function createAudioBuffer(duration, frequency, sampleRate) {
  const audioBuffer = audioBufferUtils.create(sampleRate * duration, 1, sampleRate);
  audioBufferUtils.fill(audioBuffer, (value, i, channel) => Math.sin(2 * Math.PI * i * frequency / sampleRate));
  return audioBuffer;
}

class AudioEncoder extends AudioThrough {
  static create(opts) {
    opts = Object.assign({
      frequency: 400,
      unitDuration: 0.2,
      sampleRate: 44100
    }, opts);

    return new AudioEncoder(opts);
  }

  constructor(opts) {
    super(opts);

    this.handlers = {
      [symbols.DASH]: () => createAudioBuffer(this.unitDuration * 3, this.frequency, this.sampleRate),
      [symbols.DOT]: () => createAudioBuffer(this.unitDuration, this.frequency, this.sampleRate),
      [symbols.SPACE]: () => createAudioBuffer(this.unitDuration, 0, this.sampleRate),
      'default': () => createAudioBuffer(0, this.frequency, this.sampleRate)
    }
  }

  _process(buffer, cb) {
    super._process(this.prepareBuffer(buffer), cb);
  }

  prepareBuffer(ch) {
    return audioBufferUtils.concat([
      this.encodeSingleChar(ch.toString(), this),
      createAudioBuffer(this.unitDuration, 0, this.sampleRate)
    ]);
  }

  encodeSingleChar(ch) {
    return (this.handlers[ch] || this.handlers['default'])();
  }
}

module.exports = AudioEncoder;
