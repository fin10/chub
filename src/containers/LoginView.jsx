import React from 'react'
import axios from 'axios'

import { ProfilePanel } from './../components'

import './LoginView.scss'

export default class LoginView extends React.Component {
  
  constructor(prop) {
    super(prop)
    this.state = { users: [] }
  }

  componentWillMount() {
    axios.get('/api/user?sort=-follows&limit=5')
        .then(res => {
          this.setState({
            users: res.data
          })
        })
  }

  render() {
    return (
      <div id="body" className="valign-wrapper blue-grey darken-4">
        <div id="bg" />
        <div className="row" style={{ zIndex: 1 }} >
          <div className="center-align">
            <h1 className="white-text" style={{ opacity: 0.6 }}>C-Hub</h1>
            <a className="waves-effect waves-light btn" href="/auth/google">Sign in with Google</a>
          </div>
        </div>
        {this.state.users && 
          <div id="profiles" className="row center-align">
            <div style={{ marginBottom: '24px', color: 'white', fontSize: '20px' }}>Most Followed People</div>
            <ProfilePanel 
              users={this.state.users} 
              color="white" />
          </div>
        }
      </div>
    )
  }
}