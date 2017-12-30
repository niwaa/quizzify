const natural = require('natural')
const nlp = require('compromise')
const StringUtils = require('./stringUtils')
const Gaps = {}

/**
 * selectGap - Select a gap in a sentence. Strategy:
 *
 * a) We extract POS / Tags from the sentence.
 * b) We arbitrarily select as "potential gaps" certain tag type (arbitrary type importance order).
 * c) We rank potential gaps using TfIdf against the whole article.
 *
 * Improvements: Instead of arbitrarily ranking tags importance, we could have trained a classifier on the relevance of gaps,
 * supposing we have a dataset of "good gapFills".
 *
 * @param {array} sentences all sentences from the related article
 * @param {string} sentence  gapFill sentence
 * @param {string} input     user input (wikipedia title)
 * @param {array} usedGaps  gaps that have already been used.
 *
 * @returns {type} Description
 */
Gaps.selectGap = function (sentences, sentence, input, usedGaps) {
  let gap = {}
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
  console.debug('nouns', nouns)
  console.debug('people', people)
  console.debug('places', places)
  console.debug('values', values)
  console.debug('topics', topics)
  console.debug('dates', dates)
  console.debug('adjectives', adjectives)

  if (dates.length > 0) {
    potentialGaps = [...dates]
    gap.tag = 'date'
  } else if (people.length > 0) {
    potentialGaps = [...people]
    gap.tag = 'people'
  } else if (places.length > 0) {
    potentialGaps = [...places]
    gap.tag = 'place'
  } else if (nouns.length > 2) {
    potentialGaps = [...nouns]
    gap.tag = 'noun'
  } else if (values.length > 0) {
    potentialGaps = [...values]
    gap.tag = 'value'
  } else {
    potentialGaps = [...adjectives]
    gap.tag = 'adjective'
  }

  if (potentialGaps.length === 0) {
    potentialGaps = [...nouns]
  }

  // Remove user input topic.
  potentialGaps = Gaps.fuzzyRemoval(input, potentialGaps)

  // Remove already used gaps.
  potentialGaps = potentialGaps.filter(function (el) {
    return usedGaps.indexOf(el) < 0
  })

  let ranks = Gaps.rank(potentialGaps, sentences)

  // Select gap with the highest rank.
  gap.text = Object.keys(ranks).reduce(function (a, b) { return ranks[a] > ranks[b] ? a : b })

  return gap
}

/**
 * rank - Calculate TfIdf for each gap against all sentences.
 *
 * @param {array} gaps
 * @param {array} sentences
 *
 * @returns {object} Gap and average TfIdf
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
