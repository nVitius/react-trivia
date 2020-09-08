import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import mqDecorate from 'mq-react'

import './app.scss'
import Home from './views/Home'
import Play from './views/Play'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/play',
    component: Play
  }
]

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          {routes.map(({ path, component }, index) => {
            const Child = mqDecorate(component)

            return (
              <Route key={index} path={path} exact={true}>
                <Child mq={{ mobile: '(max-width: 1000px)' }} />
              </Route>
            )
          })}
        </Switch>
      </Router>
    )
  }
}

