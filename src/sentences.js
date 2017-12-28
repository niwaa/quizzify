var natural = require('natural')

const Sentences = {}

/**
 * extractAll - Extract sentences from a text.
 *
 * @param {String} input
 * @returns {Array} array of sentences
 */
Sentences.extractAll = function (input) {
  const tokenizer = new natural.RegexpTokenizer({pattern: /[!?.]/})
  const sentences = tokenizer.tokenize(input)
  return sentences
}

module.exports = Sentences
