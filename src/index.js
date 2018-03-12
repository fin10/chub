import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import App from './App'
import Login from './Login'

const root = document.getElementById('root')

console.log(window.location.href)

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path='/'><App /></Route>
      <Route path='/login'><Login /></Route>
    </Switch>
  </Router>, 
  root
)