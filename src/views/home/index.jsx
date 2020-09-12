import React from 'react'

import './home.scss'
import ActionLink from "../../components/ActionLink";

export default class Index extends React.Component {
  render() {
    return <div
      id="home"
      className={(this.props.mobile ? 'mobile' : '')}
    >
      <h1 className="header">Trivia Fun FREE</h1>
      <ActionLink to="/play" action={this.onClick}>
        <button className="start">START</button>
      </ActionLink>
    </div>
  }

  onClick(e) {
    return new Promise(resolve => {
      // TODO move document.body calls out of here
      document.body.classList.contains('animate')
        ? document.body.classList.remove('animate')
        : document.body.classList.add('animate')

      document.getElementById('home').classList.add('fade')

      setTimeout(() => resolve(), 500)

    })
  }
}
