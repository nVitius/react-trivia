import React from 'react'

import _ from 'lodash'

import './trivia-results.scss'
import ActionLink from '../ActionLink';

export default class TriviaResults extends React.Component {
  constructor(props) {
    super(props)

    const score = _.sumBy(this.props.results, x => x.isCorrect);
    this.state = {
      score: score,
      pass: score / this.props.results.length > 0.7
    }
  }

  render() {
    return <div className="trivia-results">
      <div className="header">{ this.state.pass ? 'Congrats!' : 'Better luck next time' }</div>
      <div className="result-text">{
        this.state.pass
          ? `You correctly answered ${this.state.score} of ${this.props.results.length} questions!`
          : `You missed ${this.props.results.length - this.state.score} of ${this.props.results.length} questions.`
      }
      </div>

      <div className={ 'no-scrollbar ' + (this.props.mobile ? 'mobile' : '') }><div className="results-list">{
        this.props.results.map((x, index) => {
          return <div className={ 'result ' + (x.isCorrect ? 'correct' : 'incorrect') } key={index}>
            <span className="question">{x.question.question}</span>
          </div>
        })
      }
      </div></div>

      <ActionLink to="/" replace={true} action={this.props.onClick}>
        <button>{this.state.pass ? 'Play' : 'Try'} Again?</button>
      </ActionLink>
    </div>
  }
}
