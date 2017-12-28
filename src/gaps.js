const natural = require('natural')
const tfidf = new natural.TfIdf()

const Gaps = {}

/**
 * getMaxTFIDF - Return the sentence term with maximum TFIDF (comparatively to other sentences)
 *
 * @param {array} sentences array of sentences
 * @param {number} index Index of sentences
 *
 * @returns {string}
 */
Gaps.getMaxTFIDF = function (sentences, index) {
  const _sentences = [...sentences]

  _sentences.forEach(function (item) {
    tfidf.addDocument(item)
  })
  const terms = tfidf.listTerms(index)
  console.log('terms', terms)
  if (terms.length > 1) {
    return terms[0].term
  } else {
    return null
  }
}

module.exports = Gaps
