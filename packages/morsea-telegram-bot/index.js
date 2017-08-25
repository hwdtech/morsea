const uuid = require('uuid');
const { Composer } = require('micro-bot');
const qs = require('querystring');

const { AUDIO_API } = process.env;

const bot = new Composer();

bot.on('inline_query', ({ inlineQuery, answerInlineQuery }) => {
  return answerInlineQuery([{
    type: 'audio',
    id: uuid(),
    title: inlineQuery.query,
    audio_url: getAudioUrl(inlineQuery.query)
  }]);
});

bot.on('text', ({ replyWithVoice, message }) => {
  return replyWithVoice(getAudioUrl(message.text));
});

function getAudioUrl(message) {
  return `${AUDIO_API}/?message=${qs.escape(message)}`;
}
