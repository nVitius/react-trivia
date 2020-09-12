import React from 'react'

import './home.scss'

export default class Index extends React.Component {
  render() {
    return <div
      id="home"
      className={(this.props.mobile ? 'mobile' : '')}
    >
      <h1 className="header">Trivia Fun FREE</h1>
      <button className="start">START</button>
    </div>
  }
}
