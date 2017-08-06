const pump = require('pump');
const MorseEncoder = require('./lib/morse-encoder');

pump(new MorseEncoder('sos'), process.stdout);
