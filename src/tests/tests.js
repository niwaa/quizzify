// Quick asserts tests during development
const Sentences = require('../sentences')
const StringUtils = require('../StringUtils')
const Gaps = require('../Gaps')

let input
let result

function assert (cond, message) {
  if (cond) {
    console.info(message)
  } else {
    throw new Error('Assert fail!')
  }
}

// Asserts
input = "An electricity meter, electric meter, electrical meter, or energy meter is a device that measures the amount of electric energy consumed by a residence, a business, or an electrically powered device. Electric utilities use electric meters installed at customers' premises to measure electric energy delivered to their customers for billing purposes. They are typically calibrated in billing units, the most common one being the kilowatt hour [kWh]. They are usually read once each billing period."
result = Sentences.extractAll(input)
assert(result.length === 4, 'sentence extraction is working.')

input = 'Hello (something here) world.'
result = StringUtils.removeParenthesisContent(input)
assert(result === 'Hello  world.', 'removeParenthesisContent() is working.')

input = ['cat', 'dog']
result = Gaps.fuzzyRemoval('CAT', input)
assert(result[0] === 'dog' && result.length === 1, 'fuzzyRemoval() is working.')

input = 'This is a great day, and tomorrow will be even better.'
result = StringUtils.createGapFillSentence(input, 'Great, day')
assert(result === 'This is a ____, and tomorrow will be even better.', 'createGapFillSentence() is working.')
