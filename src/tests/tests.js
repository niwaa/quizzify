// Quick asserts tests during development
const Sentences = require('../sentences')

const input = "An electricity meter, electric meter, electrical meter, or energy meter is a device that measures the amount of electric energy consumed by a residence, a business, or an electrically powered device. Electric utilities use electric meters installed at customers' premises to measure electric energy delivered to their customers for billing purposes. They are typically calibrated in billing units, the most common one being the kilowatt hour [kWh]. They are usually read once each billing period."

const result = Sentences.extractFromText(input)
console.assert(result.length === 4)
