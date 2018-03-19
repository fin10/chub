import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { LoginView, UserView, NewSeriesView, SeriesView } from './containers'

const root = document.getElementById('root')

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/login" component={LoginView} />
      <Route path="/new" component={NewSeriesView} />
      <Route path="/:userId/:seriesId" component={SeriesView} />
      <Route path="/:userId" component={UserView} />
    </Switch>
  </Router>,
  root
)