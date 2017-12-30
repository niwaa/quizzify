import React, { Component } from 'react'
import CreateGapFill from './CreateGapFill'
import GapFillQuestions from './GapFillQuestions'

import './App.css'

const API_ENDPOINT = '/getGFQ?title='  // '/getGFQ_mock?title='
const WIKI_ENDPOINT = 'https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=&explaintext=&titles='
const EXAMPLES = ['cat', 'White House', 'linux']

class App extends Component {
  state = {
    GFQs: [],
    loading: false
  }

  clickExample (event, title) {
    event.preventDefault()
    event.stopPropagation()
    this.getGFQs(title)
  }

  getGFQs (title) {
    if (!title) {
      window.alert('Please fill input')
    } else {
      this.setState({loading: true, input: title})
      fetch(API_ENDPOINT + title)
        .then(res => res.json())
        .then(GFQs => {
          this.setState({ GFQs, loading: false })
        })
    }
  }

  render () {

    const examples = EXAMPLES.map( (example, i) =>
        <a key={i} onClick={(e) => this.clickExample(e, example)} href=''>{example}</a>
    )
    .reduce((prev, curr) => [prev, ', ', curr])

    return (
      <div className='App'>
        <h1>Quizzify</h1>
        <h3>Enter a Wikipedia article title (case sensitive).
        <br />
        Try for example: {examples}
        </h3>
        <CreateGapFill getGFQs={(title) => this.getGFQs(title)} title={this.state.input} />
        { (!this.state.loading && this.state.input) &&
          <div>
            <GapFillQuestions data={this.state.GFQs} />
            <br /><br />
            <div>Ref: <a target='_blank' href={WIKI_ENDPOINT + this.state.input}>wikipedia article</a></div>
          </div>
        }
        { this.state.loading &&
          <div>Loading...</div>
        }
      </div>
    )
  }
}

export default App
