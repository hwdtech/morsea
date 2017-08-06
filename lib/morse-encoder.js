const morsify = require('morsify');
const symbols = require('./symbols');
const CharStream = require('./char-stream');

class MorseEncoder extends CharStream {
  constructor(string, textEncoder = morsify, opts = {}) {
    opts = Object.assign({
      space: symbols.SPACE,
      dot: symbols.DOT,
      dash: symbols.DASH
    }, opts);

    const encoded = textEncoder.encode(string, opts);
    super(encoded);
  }
}

module.exports = MorseEncoder;
