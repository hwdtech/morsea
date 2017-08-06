const ReadableStream = require('stream').Readable;

class CharStream extends ReadableStream {
  constructor(string) {
    super();
    this.buffer = Buffer.from(string);
    this.offset = 0;
  }

  _read(size) {
    if (this.offset >= this.buffer.length) {
      this.push(null);
      return;
    }

    const start = this.offset;
    const end = size + this.offset;

    this.offset += size;

    process.nextTick(() => {
      this.push(this.buffer.slice(start, end));
    });
  }
}

module.exports = CharStream;
