const nlp = require('compromise')
const _ = require('lodash')
const wordvecUtils = require('./tools/wordvecUtils')
const moment = require('moment')

const Distractors = {}

/**
 * getPotentials - Generate bags of potentials distractors from article, organized by tag type.
 *
 * @param {array} sentences Article sentences
 * @returns {object} An object containing different potentials distractors by tag type.
 */
Distractors.getPotentials = function (sentences) {
  let potentials = {
    nouns: [],
    adjectives: [],
    places: [],
    people: []
  }

  sentences.forEach(function (sentence) {
    let sentenceNLP = nlp(sentence)
    let nouns = sentenceNLP.nouns().out('array')
    let adjectives = sentenceNLP.adjectives().out('array')
    let places = sentenceNLP.places().out('array')
    let people = sentenceNLP.people().out('array')
    potentials.nouns = [...nouns, ...potentials.nouns]
    potentials.adjectives = [...adjectives, ...potentials.adjectives]
    potentials.places = [...places, ...potentials.places]
    potentials.people = [...people, ...potentials.people]
  })

  potentials.nouns = [..._.uniq(potentials.nouns)]
  potentials.adjectives = [..._.uniq(potentials.adjectives)]
  potentials.places = [..._.uniq(potentials.places)]
  potentials.people = [..._.uniq(potentials.people)]

  return potentials
}

/**
 * getSelection - Select a final set of N distractors.
 * 3 techniques are used & tested to select distractors:
 * a) Get distractor from other sentences of article, belonging the same tag type.
 * b) If gap is a date, we generate nearby random dates.
 * c) If gap is a "value", we use word2vec data to find semantically similar words. We also use this method.
 * If we don't have enought distractors from other methods.
 *
 * @param {string} gap                  Chosen gap for the gapFill
 * @param {string} sentence             GapFill sentence
 * @param {object} potentialDistractors An object containing context related (article) and potentials distactors
 * @param {number} distractorsNb        Number of distractor to return
 *
 * @returns {array} Array of N distractors.
 */
Distractors.getSelection = function (gap, sentence, potentialDistractors, distractorsNb) {
  if (!gap.text || !sentence || potentialDistractors.length === 0 || !distractorsNb) {
    return []
  }

  let distractors = []

  if (gap.tag === 'noun') {
    distractors = Distractors.selectFromContext(gap.text, potentialDistractors.nouns, distractorsNb)
  } else if (gap.tag === 'adjective') {
    distractors = Distractors.selectFromContext(gap.text, potentialDistractors.adjectives, distractorsNb)
  } else if (gap.tag === 'people') {
    distractors = Distractors.selectFromContext(gap.text, potentialDistractors.people, distractorsNb)
  } else if (gap.tag === 'place') {
    distractors = Distractors.selectFromContext(gap.text, potentialDistractors.places, distractorsNb)
  } else if (gap.tag === 'date') {
    distractors = Distractors.selectNearDates(gap.text, distractorsNb)
  } else if (gap.tag === 'value') {
    distractors = Distractors.selectSimilarWords(gap.text, distractorsNb)
  }

  if (distractors.length < distractorsNb) {
    distractors = [...distractors, Distractors.selectSimilarWords(gap.text, distractorsNb - distractors.length)]
  }

  return distractors
}

/**
 * selectFromContext - Return a selected N number of distractors from an array of potentials distractors.
 * We remove the gap from the potentials distractors.
 * Right now selection is a random function, but we want to implement a mechanism to rank distractor close in similarity to gap.
 *
 * @param {type} gap        Description
 * @param {type} potentials Description
 * @param {type} number     Description
 *
 * @returns {type} Description
 */
Distractors.selectFromContext = function (gap, potentials, number) {
  // Remove gap from potentials distractors
  let distractors = _.without(potentials, gap)

  // Naive random method for now.
  // @todo: rank distractors in relation with gap similarity
  let results = _.sampleSize(distractors, number)
  return results
}

/**
 * selectNearDates - Return N number of random dates string.
 * This method could be improved in a lot of ways (return the same date format, a better algorithm to generate similar dates...)
 * @param {string} dateString String representation of a date
 * @param {number} datesNb    number N of dates to return.
 *
 * @returns {array} Array of date string.
 */
Distractors.selectNearDates = function (dateString, datesNb) {
  let dates = []
  for (let i = 0; i < datesNb; i++) {
    let date = null
    try {
      date = moment(dateString).add(_.random(-1000, 1000), 'days').format('MMMM D YYYY')
    } catch (e) {
      console.error(e)
    }
    dates.push(date)
  }
  return dates
}

/**
 * selectSimilarWords - Uses wordvec data to return semantically similar words.
 *
 * @param {string} word
 * @param {number} number
 *
 * @returns {array} Array of similar words
 */
Distractors.selectSimilarWords = function (word, number) {
  let selections = []
  let similarWords = wordvecUtils.findSimilarWords(number + 1, word)
  if (similarWords[0]) {
    similarWords.splice(0, 1) // First result is word itself.
    similarWords.some(function (word, index) {
      let text = word[0]
      selections.push(text)
      return index === number - 1
    })
  }
  return selections
}

module.exports = Distractors
