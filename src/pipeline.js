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
    const gap = Gaps.getMaxTFIDF(sentences, 0)
    const gapFill = Pipeline.createGapFillSentence(sentences[0], gap)
    console.debug('gapFill', gapFill)
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
