const morsify = require('morsify');
const symbols = require('./symbols');
const through2 = require('through2');
const each = require('async/eachSeries');

module.exports = {
  create(textEncoder = morsify, opts = {}) {
    opts = Object.assign({
      space: symbols.SPACE,
      dot: symbols.DOT,
      dash: symbols.DASH
    }, opts);

    return through2(function (chunk, enc, cb) {
      const encoded = textEncoder.encode(chunk.toString(), opts);

      each(
        encoded.split(''),
        (ch, next) => {
          this.push(ch);
          next();
        },
        () => {
          this.push(symbols.SPACE);
          cb();
        }
      );
    });
  }
};
