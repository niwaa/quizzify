import React from 'react'
import PropTypes from 'prop-types'
import DistractorBtn from './DistractorBtn'

class GapFillQuestions extends React.Component {
  _submitAnswer (answer, distractor) {
    if (answer === distractor) {
      window.alert('Good answer')
    } else {
      window.alert('Bad answer')
    }
  }

  render () {
    let GFQs = this.props.data.map(function (GFQ) {
      let answer = GFQ.answer
      let distractors = GFQ.distractors.map((distractor, index) =>
        <span key={index}>
          <DistractorBtn distractor={distractor} answer={answer} />&nbsp;
        </span>
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
