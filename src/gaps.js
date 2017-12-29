const natural = require('natural')
const nlp = require('compromise')
const StringUtils = require('./StringUtils')
const Gaps = {}

/**
 * getMaxTFIDF - Return the sentence term with maximum TFIDF (comparatively to other sentences)
 *
 * @param {array} sentences array of sentences
 * @param {number} index Index of sentences
 *
 * @returns {string}
 */
Gaps.selectGap = function (sentences, sentence, input, usedGaps) {
  let gap
  let potentialGaps = []
  let sentenceCleaned = StringUtils.removeParenthesisContent(sentence)
  let sentenceNLP = nlp(sentenceCleaned)

  let nouns = sentenceNLP.nouns().out('array')
  let people = sentenceNLP.people().out('array')
  let places = sentenceNLP.places().out('array')
  let values = sentenceNLP.values().out('array')
  let topics = sentenceNLP.topics().out('array')
  let dates = sentenceNLP.dates().out('array')
  let adjectives = sentenceNLP.adjectives().out('array')
  console.log('nouns', nouns)
  console.log('people', people)
  console.log('places', places)
  console.log('values', values)
  console.log('topics', topics)
  console.log('dates', dates)
  console.log('adjectives', adjectives)

  if (dates.length > 0) {
    potentialGaps = [...dates]
  }
  else if (nouns.people > 0) {
    potentialGaps = [...people]
  }
  else if (nouns.places > 0) {
    potentialGaps = [...places]
  }
  else if (nouns.length > 3) {
    potentialGaps = [...nouns]
  }
  else {
    potentialGaps = [...nouns, ...adjectives]
  }

  // Remove user input topic.
  potentialGaps = Gaps.fuzzyRemoval(input, potentialGaps)

  // Remove already used gaps.
  potentialGaps = potentialGaps.filter(function (el) {
    return usedGaps.indexOf(el) < 0
  })

  let ranks = Gaps.rank(potentialGaps, sentences)
  // Select gap with the highest rank.
  gap = Object.keys(ranks).reduce(function (a, b) { return ranks[a] > ranks[b] ? a : b })
  console.log('ranks', ranks, gap)
  return gap
}

/**
 * rank - Description
 *
 * @param {array} gaps      Description
 * @param {array} sentences Description
 *
 * @returns {object} Description
 */
Gaps.rank = function (gaps, sentences) {
  let ranks = {}
  let tfidf = new natural.TfIdf()

  sentences.forEach(function (sentences) {
    tfidf.addDocument(sentences)
  })

  gaps.forEach(function (gap) {
    let sum = 0
    tfidf.tfidfs(gap, function (i, measure) {
      sum += measure
    })
    let average = sum / gaps.length
    ranks[gap] = average
  })
  return ranks
}

/**
 * fuzzyRemoval - Remove a searchItem from an items array without case-sensitivity.
 * @param {string} searchItem string to match.
 * @param {array} items  array of string
 *
 * @returns {type} Description
 */
Gaps.fuzzyRemoval = function (searchItem, items) {
  let results = [...items]
  items.forEach(function (item, index) {
    if (searchItem.toUpperCase() === item.toUpperCase()) {
      results.splice(index, 1)
    }
  })
  return results
}

module.exports = Gaps
