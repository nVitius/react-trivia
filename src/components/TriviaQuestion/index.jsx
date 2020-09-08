import React from 'react'
import {CSSTransition, SwitchTransition} from "react-transition-group";
import { AllHtmlEntities } from 'html-entities'

import './trivia-question.scss'

const entities = new AllHtmlEntities()

export default class TriviaQuestion extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selected: null,
      deselected: null,
      checked: null,
      correct: null
    }
  }

  render() {
    return <div className="trivia-content">
      <div className="header">Question {this.props.question.index + 1}<span>/{this.props.count}</span></div>
      <div className="question">{
        entities.decode(this.props.question.text)
      }
      </div>
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

      <div className="next">
        <button
          className={(['small', this.state.selected === null ? 'disabled' : '']).join(' ')}
          onClick={() => this.checkOrNext()}
        >
          <SwitchTransition mode="out-in">
            <CSSTransition
              key={this.state.checked ? 'next' : 'check'}
              classNames="fade"
              addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
              timeout={300}
            >
              <span>{this.state.checked ? 'NEXT' : 'CHECK'}</span>
            </CSSTransition>

          </SwitchTransition>
        </button>
      </div>
    </div>
  }

  select(answer) {
    if (this.state.checked)
      return

    this.setState({
      selected: this.state.selected === answer ? null : answer,
      deselected: this.state.selected === null ? null : this.state.selected
    })
  }

  checkOrNext() {
    if (this.state.selected === null)
      return

    if (this.state.checked !== true)
      this.setState({
        checked: true,
        correct: this.props.question.answer === this.state.selected
      })
    else
      this.props.onNext(this.state.correct)
  }

}
