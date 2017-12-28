const Wikipedia = require('./wikipedia')
const Sentences = require('./sentences')
const Gaps = require('./gaps')

const Pipeline = {}

/**
 * generateGFQdata - generate the JSON output format for rendering the gap-fill with questions.
 *
 * @param {string} input wikipedia title input
 * @returns {json}
 */
Pipeline.generateGFQdata = function (input) {
  Wikipedia.getArticle('cat')
  .then(function (article) {
    const sentences = Sentences.extractAll(article)
    console.log('sentences', sentences)
    console.log('sentences 0', sentences[0])
    const gap = Gaps.getMaxTFIDF(sentences, 0)
    console.log('gap', gap)

    const gapFill = Pipeline.createGapFillSentence(sentences[0], gap)
    console.log('gapFill', gapFill)
  })
}

/**
 * createGapFillSentence - Remplace a sentence with a gap. Ie: "My blue car" =>  "My blue __"  (gap = "car")
 * @param {string} sentence
 * @param {string} gap
 * @returns {string}
 */
Pipeline.createGapFillSentence = function (sentence, gap) {
  if (!sentence || !gap) {
    return null
  }

  const regex = new RegExp(gap, 'i')
  return sentence.replace(regex, '__')
}

module.exports = Pipeline
