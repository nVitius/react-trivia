import React from 'react'
import {CSSTransition, SwitchTransition} from 'react-transition-group'

import _ from 'lodash'

import './play.scss'
import ActionLink from "../../components/ActionLink"

export default class Play extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selected: null,
      deselected: null,
      checked: null,
      correct: null
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
      <ActionLink to="/" replace={true} action={this.exit}>
        <span className="exit"><i className="fa fa-arrow-left"/></span>
      </ActionLink>
      <div className="card">
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={_.has(this.state, 'quiz') && this.state.quiz.length > 0 ? 'card' : 'loader'}
            classNames="fade"
            addEndListener={(node, done) => node.addEventListener("transitionend", done, false)}
            timeout={300}
          >{
            _.has(this.state, 'quiz') && this.state.quiz.length > 0
            ? <div className="content">
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
            : <span className="loader"><i className="fa fa-spinner fa-spin"/></span>
          }
          </CSSTransition>
        </SwitchTransition>
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
        correct: false
      })
    else
      this.setState({checked: false, correct: false})
  }

  exit() {
    return new Promise(resolve => {
      document.body.classList.contains('animate')
        ? document.body.classList.remove('animate')
        : document.body.classList.add('animate')

      document.getElementById('play').classList.add('fade')

      setTimeout(() => resolve(), 500) // Wait for document.body animation to finish

    })
  }
}

Play.defaultProps = {
  count: 10
}
