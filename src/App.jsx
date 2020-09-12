import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import './app.scss'
import Home from './views/home'

const routes = [
  {
    path: '/',
    component: Home
  }
]

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          {routes.map(({ path, component }, index) => {
            return (
              <Route key={index} path={path} exact={true} component={component} />
            )
          })}
        </Switch>
      </Router>
    )
  }
}

