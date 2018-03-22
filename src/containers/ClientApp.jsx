import React from "react"

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Header, Profile } from '../components'
import { NewSeriesView, NewWorkView, SeriesListView, SeriesView, WorkView } from './'

export default class ClientApp extends React.Component {

  render() {
    return ( 
      <div>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col s3">
              <Profile {...this.props} />
            </div>
            <div className="col s9">
              <Router>
                <Switch>
                  <Route path="/new" component={NewSeriesView} />
                  <Route path="/:userId/:seriesId/new" component={NewWorkView} />
                  <Route path="/:userId/:seriesId/:workId" component={WorkView} />
                  <Route path="/:userId/:seriesId" component={SeriesView} />
                  <Route path="/:userId" component={SeriesListView} />
                </Switch>
              </Router>
            </div>
          </div>
        </div>
      </div>
    )
  }
}