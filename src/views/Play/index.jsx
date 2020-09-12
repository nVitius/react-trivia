import React from 'react'

import './play.scss'

export default class Play extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selected: null,
      deselected: null
    }
  }

  loadQuiz() {
    return fetch(`https://opentdb.com/api.php?amount=${this.props.count}&difficulty=hard&type=boolean`)
      .then(res => res.json())
  }

  componentDidMount() {
    setTimeout(() => {
      document.getElementById('play').style.opacity = '1'
    }, 0) // No timeout will cause the CSS animation to not trigger

    this.loadQuiz().then(data => setTimeout(
      () => this.setState({quiz: data['results']}), 500) // Minimum loader time.
    )

  }

  render() {
    return<div id="play">
      <div className="card">
        <div className="content">
          <div className="header">Question 1<span>/{this.props.count}</span></div>
          <div className="question">This is a test question can you answer it correctly?</div>
          <div className="answers">
            <div
              className={
                ([
                  'answer',
                  this.state.selected === true ? 'selected' : '',
                  this.state.deselected === true ? 'deselected' : '',
                  this.state.selected === true && this.state.checked === true
                    ? this.state.correct === true
                    ? 'correct' : 'incorrect'
                    : ''
                ]).join(' ')
              }
              onClick={() => this.select(true)}
            >
              <span className="answer-text">TRUE</span>
              <span className="answer-icon"><i className="fa fa-check"/></span>
            </div>
            <div
              className={
                ([
                  'answer',
                  this.state.selected === false ? 'selected' : '',
                  this.state.deselected === false ? 'deselected' : '',
                  this.state.selected === false && this.state.checked === true
                    ? this.state.correct === true
                    ? 'correct' : 'incorrect'
                    : ''
                ]).join(' ')
              }
              onClick={() => this.select(false)}
            >
              <span className="answer-text">FALSE</span>
              <span className="answer-icon"><i className="fa fa-check"/></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  }

  select(answer) {
    this.setState({
      selected: this.state.selected === answer ? null : answer,
      deselected: this.state.selected === null ? null : this.state.selected
    })
  }
}

Play.defaultProps = {
  count: 10
}
