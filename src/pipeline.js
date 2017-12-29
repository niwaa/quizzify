const Wikipedia = require('./wikipedia')
const Sentences = require('./sentences')
const Gaps = require('./gaps')
const StringUtils = require('./stringUtils')
const Pipeline = {}

/*
let GFQs = [
  {
    id: 1,
    gapfill: 'The white __ arrived.',
    distractors: ['cat', 'dog', 'pet', 'orange'],
    answer: 'cat'
  },
  {
    id: 2,
    gapfill: 'The black __ arrived.',
    distractors: ['cat', 'dog', 'pet', 'orange'],
    answer: 'dog'
  }
]
*/

/**
 * generateGFQdata - generate the JSON output format for rendering the gap-fill with questions.
 *
 * @param {string} input wikipedia title input
 * @returns {object} promise object that will resolve to the JSON output
 */
Pipeline.generateGFQdata = function (input) {
  let GFQs = []
  const MAX_GFQS = 4

  return new Promise(function (resolve, reject) {
    Wikipedia.getArticle(input)
    .then(function (article) {
      let allSentences = Sentences.extractAll(article)
      // let relevantSentences = Sentences.selectRelevant(sentences)  // @todo

      let usedGaps = []

      allSentences.some(function (sentence, index) {
        let gap = Gaps.selectGap(allSentences, sentence, input, usedGaps)
        usedGaps.push(gap)

        let distractors = [gap, 'distractor1', 'distractor2', 'distractor3']
        let gapFill = StringUtils.createGapFillSentence(sentence, gap)

        let GFQ = {
          id: index,
          gapfill: gapFill,
          answer: gap,
          distractors: distractors
        }
        if (gapFill && gap) { // @todo : check distractors too here.
          GFQs.push(GFQ)
        }
        return index === MAX_GFQS - 1
      })

      resolve(GFQs)
      // Handle errors
    })
  })
}

module.exports = Pipeline
