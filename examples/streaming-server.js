'use strict';

const pump = require('pump');
const express = require('express');
const opus = require('node-opus');
const ogg = require('ogg');
const lame = require('lame');
const { CharStream, TextEncoder, AudioEncoder }  = require('../index');

const app = express();

function createAudioStream(text) {
  return pump(
    CharStream.create(text),
    TextEncoder.create(),
    AudioEncoder.create()
  );
}

app.get('/:message.ogg', (req, res) => {
  res.setHeader('Content-Type', 'audio/ogg');

  const opusEncoder = new opus.Encoder(48000, 2);
  const oggEncoder = new ogg.Encoder();

  pump(oggEncoder, res);

  pump(
    createAudioStream(req.params.message),
    opusEncoder,
    oggEncoder.stream()
  );

});

app.get('/:message.mp3', (req, res) => {
  res.setHeader('Content-Type', 'audio/mpeg');

  pump(
    createAudioStream(req.params.message),
    new lame.Encoder({ bitRate: 32 }),
    res
  );

});

app.listen(3001, () => console.log('started'));
