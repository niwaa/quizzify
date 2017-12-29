import React from 'react'
import PropTypes from 'prop-types'

const CreateGapFill = function (props) {
  function _submit (event) {
    event.preventDefault()
    event.stopPropagation()

    const data = new window.FormData(event.target)
    const title = data.get('title').trim()
    props.getGFQs(title)
  }

  return (
    <div>
      <form onSubmit={(e) => _submit(e)}>
        <input className='title_input' name='title' type='text' placeholder='Enter a Wikipedia title' autoFocus />
        <button>Generate Gap Fills</button>
      </form>
    </div>
  )
}

CreateGapFill.propTypes = {
  getGFQs: PropTypes.func.isRequired
}

export default CreateGapFill
