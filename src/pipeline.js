const Wikipedia = require('./wikipedia')
const Sentences = require('./sentences')
const Gaps = require('./gaps')
const StringUtils = require('./stringUtils')
const Distractors = require('./Distractors')
const _ = require('lodash')

const Pipeline = {}

const GFQsError = [
  {
    id: 1,
    gapfill: 'Can\'t find Wikipedia article. Error ____ .',
    distractors: ['306', '404', '500', '444'],
    answer: '404'
  }
]

/**
 * generateGFQdata - generate the JSON output format for rendering the gap-fill with questions.
 *
 * @param {string} input wikipedia title input
 * @returns {object} promise object that will resolve to the JSON output
 */
Pipeline.generateGFQdata = function (input) {
  console.log(input)
  let GFQs = []
  const MAX_GFQS = 4
  const DISTRACTORS_NB = 3

  return new Promise(function (resolve, reject) {
    Wikipedia.getArticle(input)
    .then(function (article) {
      if (!article) {
        resolve(GFQsError)
      }
      let allSentences = Sentences.extractAll(article)
      // let relevantSentences = Sentences.selectRelevant(sentences)  // @todo

      let usedGaps = []

      let potentialDistractors = Distractors.getPotentials(allSentences)

      allSentences.some(function (sentence, index) {
        let gap = Gaps.selectGap(allSentences, sentence, input, usedGaps)
        usedGaps.push(gap.text)
        let selectedDistractors = Distractors.getSelection(gap, sentence, potentialDistractors, DISTRACTORS_NB)

        let distractors = _.shuffle([gap.text, ...selectedDistractors])
        let gapFill = StringUtils.createGapFillSentence(sentence, gap.text)

        let GFQ = {
          id: index,
          gapfill: gapFill,
          answer: gap.text,
          distractors: distractors
        }
        if (gapFill && gap.text && distractors.length > 0) {
          GFQs.push(GFQ)
        }
        return index === MAX_GFQS - 1
      })

      resolve(GFQs)
      // Handle errors
    })
    .catch(function (error) {
      console.error(error)
    })
  })
}

module.exports = Pipeline
