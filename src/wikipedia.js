const request = require('request')

const API = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&formatversion=2&explaintext=&titles='
const Wikipedia = {}

/**
 * getArticle - Fetch a wikipedia article based on title. Ie : "cat", "White House"
 *
 * @param {String} title
 * @returns {String} article extract
 */
Wikipedia.getArticle = function (title) {
  const url = API + title
  return new Promise(function (resolve, reject) {
    request.get(url, (error, response, body) => {
      if (error) {
        reject(error)
      }

      let json = JSON.parse(body)
      let pages = json.query.pages
      let extract

      if (!pages[0].missing) {
        if (pages[0].extract.length > 300) {
          extract = pages[0].extract
        } else {
          extract = null
        }
      } else {
        extract = null
      }
      resolve(extract)
    })
  })
}

module.exports = Wikipedia
