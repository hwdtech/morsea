'use strict';

const { send } = require('micro');
const getMessage = require('./extract-message');
const createAudio = require('./audio-stream');
const encodeAudio = require('./ogg-encoder');
const tryRespond = require('./limiter');

module.exports = async (req, res) => {
  const msg = getMessage(req);

  if (!msg) {
    return send(res, 400, 'Empty message');
  }

  if (msg.length > 500) {
    return send(res, 400, 'Message longer than 500 symbols');
  }

  try {
    const requestsLeft = await tryRespond();

    res.setHeader('X-RateLimit-Remaining', requestsLeft);
    res.setHeader('Content-Type', 'audio/ogg');

    encodeAudio(
      createAudio(msg),
      res
    );
  } catch(err) {
    send(res, 429);
  }
};
