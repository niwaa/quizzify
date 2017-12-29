var express = require('express')
var router = express.Router()
const pipeline = require('../src/pipeline')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.get('/getGFQ', function (req, res, next) {
  if (!req.query.title) {
    res.send('wikipedia title undefined')
  } else {
    res.json(pipeline.generateGFQdata(req.query.title))
  }
})

// getGFQ_mock : mocked with test data for the Client.
router.get('/getGFQ_mock', function (req, res, next) {
  let GFQ = [
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

  if (!req.query.title) {
    res.send('wikipedia title undefined')
  } else {
    res.json(GFQ)
  }
})

module.exports = router
