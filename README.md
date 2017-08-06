# morsea

Encode morse messages into text and audio streams!

## Installation

`npm install morsea`

## Cli usage

```
Usage: morse [options] [bare words here]
Options:
  --help prints this message
```

Example

```
node bin/morse sos
.../---/.../%
```

## API

#### CharStream

Helper stream factory to produce streams from strings. Usage is very simple:

```js
const CharStream = require('morsea/char-stream');

CharStream.create('Hello, world!').pipe(process.stdout);
```

#### TextEncoder

The transform stream to encode string streams into morse codes. The output is split into single chars (dot, dash or space). Usage:

```js
const CharStream = require('morsea/char-stream');
const TextEncoder = require('morsea/text-encoder');

CharStream.create('Hello, world!')
  .pipe(TextEncoder.create(textEncoder, options))
  .pipe(process.stdout);
```

Under the hood it uses [morsify](https://www.npmjs.com/package/morsify) as `textEncoder` by default. But you can provide any encoder you like. It should has the same interfase as morsify, ie. `textEncoder.encode(text, options)`

##### Options

Default options are:

```
{
  space: '/',
  dash: '-',
  dot: '.'
}
```

#### AudioEncoder

The transform stream to encode morse code message symbols into raw audio buffers. Usage:

```js
const CharStream = require('morsea/char-stream');
const TextEncoder = require('morsea/text-encoder');
const AudioEncoder = require('morsea/audio-encoder');

CharStream.create('Hello, world!')
  .pipe(TextEncoder.create(textEncoder, options))
  .pipe(AudioEncoder.create(options));
```

Also, see examples folder how to output morse audio in mp3.

##### Options

Default options are:

```
{
  unitDuration: 0.2, // how long dot symbol will sound (sec)
  frequency: 400, // oscillator frequency (Hz)
  sampleRate: 44100 // audio sample rate (Hz)
}
```

## Examples

See `examples` folder 
