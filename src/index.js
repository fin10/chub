import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import App from './containers/App'
import Login from './containers/Login'
import Profile from './containers/Profile'

const root = document.getElementById('root')

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/profile/:id" component={Profile} />
    </Switch>
  </Router>,
  root
)