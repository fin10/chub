import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { DiscoveryView, LoginView, ClientApp } from './containers'

const root = document.getElementById('root')

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/discovery" component={DiscoveryView} />
      <Route path="/login" component={LoginView} />
      <Route path="/" component={ClientApp} />
    </Switch>
  </Router>,
  root
)