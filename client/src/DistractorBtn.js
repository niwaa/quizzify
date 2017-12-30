import React from 'react'
import PropTypes from 'prop-types'

class DistractorBtn extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      color: 'grey'
    }
  }

  _submitAnswer (answer, distractor) {
    if (answer === distractor) {
      this.setState({color: 'green'})
    } else {
      this.setState({color: 'red'})
    }
  }

  render () {
    return (
      <button className={'btn_' + this.state.color} onClick={() => this._submitAnswer(this.props.answer, this.props.distractor)}>{this.props.distractor}</button>
    )
  }
}

DistractorBtn.propTypes = {
  answer: PropTypes.string.isRequired,
  distractor: PropTypes.string.isRequired
}

export default DistractorBtn
