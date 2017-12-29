import React, { Component } from 'react'
import CreateGapFill from './CreateGapFill'
import GapFillQuestions from './GapFillQuestions'

import './App.css'

const API_ENDPOINT = '/getGFQ?title='
const WIKI_ENDPOINT = 'https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=&explaintext=&titles='

class App extends Component {
  state = {
    GFQs: [],
    loading: false
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
    return (
      <div className='App'>
        <h1>Quizzify</h1>
        <h3>Enter a Wikipedia article title, ie: "<a href='#'>cat</a>", "White House", "linux". [Sensitive to case]</h3>
        <CreateGapFill getGFQs={(title) => this.getGFQs(title)} />
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
