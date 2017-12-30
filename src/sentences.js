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

module.exports = Sentences
