const natural = require('natural')
const StringUtils = {}

/**
 * removeParenthesisContent - Remove parenthesis and content from string.
 * @param {string} str
 * @returns {string}
 */
StringUtils.removeParenthesisContent = function (str) {
  return str.replace(/\([^()]*\)/g, '')
}

/**
 * createGapFillSentence - Remplace a sentence with a gap. Ie: "My blue car" =>  "My blue __"  (gap = "car")
 * @param {string} sentence
 * @param {string} gap
 * @returns {string}
 */
StringUtils.createGapFillSentence = function (sentence, gap) {
  if (!sentence || !gap) {
    return null
  }
  let search = natural.LevenshteinDistance(gap, sentence, {search: true})
  return sentence.replace(search.substring, '____')
}

module.exports = StringUtils
