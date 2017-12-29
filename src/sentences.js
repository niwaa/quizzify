const natural = require('natural')
const nlp = require('compromise')

const Sentences = {}

/**
 * extractAll - Extract sentences from a text.
 *
 * @param {String} input
 * @returns {Array} array of sentences
 */
Sentences.extractAll = function (input) {
  let sentences = []
  let sentencesRaw = nlp(input).sentences().data()
  sentencesRaw.forEach(function (s) {
    sentences.push(s.text)
  })
  return sentences
}

// @deprecated. Not working well with sentences like : John X, M.D in VA.
Sentences.extractAll_old = function (input) {
  const tokenizer = new natural.RegexpTokenizer({pattern: /[!?.]/})
  const sentences = tokenizer.tokenize(input)
  return sentences
}

module.exports = Sentences
