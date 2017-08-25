const morsify = require('morsify');
const through2 = require('through2');
const symbols = require('./symbols');

module.exports = {
  create(textEncoder = morsify, opts = {}) {
    opts = Object.assign({
      space: symbols.SPACE,
      dot: symbols.DOT,
      dash: symbols.DASH
    }, opts);

    return through2(function (chunk, enc, cb) {
      const encoded = textEncoder.encode(chunk.toString('utf8'), opts);
      cb(null, Buffer.from(`${encoded}${symbols.SPACE}`));
    });
  }
};
