import React from 'react'

import './play.scss'

export default class Play extends React.Component {
  loadQuiz() {
    return fetch(`https://opentdb.com/api.php?amount=${this.props.count}&difficulty=hard&type=boolean`)
      .then(res => res.json())
  }

  componentDidMount() {
    this.loadQuiz().then(data => setTimeout(
      () => this.setState({quiz: data['results']}), 500) // Minimum loader time.
    )

  }

  render() {
    return <div id="play"></div>
  }
}

Play.defaultProps = {
  count: 10
}
