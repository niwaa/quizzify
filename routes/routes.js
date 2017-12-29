const express = require('express')
const router = express.Router()

const Pipeline = require('../src/pipeline')
const Wikipedia = require('../src/wikipedia')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

// @deprecated
router.get('/getArticle', async function (req, res, next) {
  if (!req.query.title) {
    res.send('wikipedia title undefined')
  }

  try {
    const article = await Wikipedia.getArticle(req.query.title)
    res.send(article)
  } catch (e) {
    next(e)
  }
})

router.get('/getGFQ', async function (req, res, next) {
  if (!req.query.title) {
    res.send('wikipedia title undefined')
  } else {
    try {
      const article = await Pipeline.generateGFQdata(req.query.title)
      res.json(article)
    } catch (e) {
      next(e)
    }
  }
})

// Get getGFQ : mocked with test data
router.get('/getGFQ_mock', function (req, res, next) {
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

  if (!req.query.title) {
    res.send('wikipedia title undefined')
  } else {
    res.json(GFQs)
  }
})

module.exports = router
