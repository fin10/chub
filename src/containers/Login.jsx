import React from 'react'

export default class Login extends React.Component {
  
  render() {
    return ( 
      <div>
        <h1>C-Hub</h1>
        <a href="/auth/google">
          <button>Sign in with Google</button>
        </a>
      </div>
    )
  }
}