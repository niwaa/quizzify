import React, { Component } from 'react'
import CreateGapFill from './CreateGapFill'
import GapFillQuestions from './GapFillQuestions'

import './App.css'

class App extends Component {
  state = {
    GFQs: []
  }

  getGFQs (title) {
    if (!title) {
      window.alert('Please fill input')
    } else {
      fetch('/getGFQ_mock?title=' + title)
        .then(res => res.json())
        .then(GFQs => this.setState({ GFQs }))
    }
  }

  render () {
    return (
      <div className='App'>
        <CreateGapFill getGFQs={(title) => this.getGFQs(title)} />
        <GapFillQuestions data={this.state.GFQs} />
      </div>
    )
  }
}

export default App
