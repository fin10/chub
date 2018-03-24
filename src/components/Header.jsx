import React from 'react'
import axios from 'axios'

import './Home.scss'

export default class Header extends React.Component {

  constructor(props) {
    super(props)
    this.state = { user: null }

    axios.get("/auth/user")
    .then(res => {
      this.setState({
        user: res.data
      })
    })
    .catch(err => {
      console.error(err.response)
    })
  }

  componentDidUpdate() {
    $(document).ready(() => {
      $(".dropdown-button").dropdown()      
    })
  }

  render() {
    const { user } = this.state

    const item = user ?
      <a className="dropdown-button" data-activates="dropdown">{user.username}</a> :
      <a href="/login">Login</a>

    return (
      <div>
        <ul id="dropdown" className="dropdown-content">
          <li><a href="/">My page</a></li>
          <li><a href="/logout">Logout</a></li>
        </ul>
        <nav className="row grey darken-3">
          <div className="nav-wrapper col s12">
            <a className="brand-logo" href="/">C-Hub</a>
            <ul className="right hide-on-med-and-down">
              <li>{item}</li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}