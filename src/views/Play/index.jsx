import React from 'react'
import {CSSTransition, SwitchTransition} from 'react-transition-group'

import _ from 'lodash'

import './play.scss'

import ActionLink from '../../components/ActionLink'
import TriviaQuestion from '../../components/TriviaQuestion';

export default class Play extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentQuestion: 0,
      results: [],
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
            /* if quiz is loaded: show quiz, else show loader */
            /* if quiz is loaded and `currentQuestion` is past the last question: show results page */
            _.has(this.state, 'quiz') && this.state.quiz.length > 0
              ? <TriviaQuestion
                  question={{
                    index: this.state.currentQuestion,
                    text: this.state.quiz[this.state.currentQuestion]['question'],
                    answer: this.state.quiz[this.state.currentQuestion]['correct_answer'] === 'True'
                  }}
                  count={this.props.count}
                  onNext={x => this.next(x)}
                  key={`question_${this.state.currentQuestion}`}
                />
              : <span className="loader"><i className="fa fa-spinner fa-spin"/></span>
          }
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  }

  next(isCorrect) {
    this.setState({
      results: [
        ...this.state.results,
        {
          index: this.state.currentQuestion,
          question: this.state.quiz[this.state.currentQuestion],
          isCorrect
        }
      ],
      currentQuestion: this.state.currentQuestion + 1
    })
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
