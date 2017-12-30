import React from 'react'
import PropTypes from 'prop-types'

class CreateGapFill extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  componentWillReceiveProps (newProps) {
    this.setState({value: newProps.title})
  }

  _submit (event) {
    event.preventDefault()
    event.stopPropagation()

    const data = new window.FormData(event.target)
    const title = data.get('title').trim()
    this.props.getGFQs(title)
  }

  handleChange (event) {
    this.setState({value: event.target.value})
  }

  render () {
    return (
      <div>
        <form onSubmit={(e) => this._submit(e)}>
          <input className='title_input' name='title' type='text' value={this.state.value} onChange={(e) => this.handleChange(e)}
            placeholder='Enter a Wikipedia title' autoFocus />
          <button>Generate Gap Fills</button>
        </form>
      </div>
    )
  }
}

CreateGapFill.propTypes = {
  getGFQs: PropTypes.func.isRequired
}

export default CreateGapFill
