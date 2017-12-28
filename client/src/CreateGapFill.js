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
      <h1>Gap Fill Question Generator</h1>
      <form onSubmit={(e) => _submit(e)}>
        <input name='title' type='text' placeholder='Wikipedia Article Title. Ie: "Cat", "White House"' autoFocus />
        <button>Generate</button>
      </form>
    </div>
  )
}

CreateGapFill.propTypes = {
  getGFQs: PropTypes.func.isRequired
}

export default CreateGapFill
