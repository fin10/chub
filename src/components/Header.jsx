import React from 'react'
import axios from 'axios'

import './Home.scss'

export default class Header extends React.Component {

  constructor(props) {
    super(props)
    this.state = { user: null }

    axios.get("/api/user/current")
    .then(res => {
      this.setState({
        user: res.data
      })
    })
    .catch(err => {
      console.error(err.response)
    })
  }

  render() {
    const { user } = this.state

    const item = user ?
      <a href={"/" + user.id}>{user.username}</a> :
      <a href="/login">Login</a>

    return (
      <nav className="row grey darken-3">
        <div className="nav-wrapper col s12">
          <a className="brand-logo" href="/">C-Hub</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>{item}</li>
          </ul>          
        </div>
      </nav>
    )
  }
}