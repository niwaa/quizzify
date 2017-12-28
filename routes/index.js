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

module.exports = router