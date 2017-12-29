import React from 'react'
import PropTypes from 'prop-types'

class GapFillQuestions extends React.Component {
  _submitAnswer (answer, distractor) {
    if (answer === distractor) {
      window.alert('Good answer')
    } else {
      window.alert('Bad answer')
    }
  }

  render () {
    let _this = this
    let GFQs = this.props.data.map(function (GFQ) {
      let answer = GFQ.answer
      let distractors = GFQ.distractors.map((distractor, index) =>
        <button onClick={() => _this._submitAnswer(answer, distractor)} key={index}>{distractor}</button>
      )
      return (
        <div key={GFQ.id}>
          <h2>{GFQ.gapfill}</h2>
          <div>
            {distractors}
          </div>
        </div>
      )
    })
    return (
      <div>
        {GFQs}
      </div>
    )
  }
}

GapFillQuestions.propTypes = {
  data: PropTypes.array.isRequired
}

export default GapFillQuestions
