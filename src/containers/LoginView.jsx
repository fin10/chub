import React from 'react'

import './LoginView.scss'

export default class LoginView extends React.Component {
  
  render() {
    return ( 
      <div id="body" className="valign-wrapper blue-grey darken-4">
        <div id="bg" />
        <div className="row">
          <div className="center-align">
            <h1 className="white-text">C-Hub</h1>
            <a className="waves-effect waves-light btn" href="/auth/google">Sign in with Google</a>
          </div>
        </div>
      </div>
    )
  }
}