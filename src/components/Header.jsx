import React from 'react'
import axios from 'axios'

export default class Header extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      user: {
        username: '',
        photo: ''
      }
    }

    axios.get("/api/user/current")
    .then((res) => {
      this.setState({
        user: res.data
      })
    })
    .catch((err) => {
      console.error(err)
    })
  }

  render() {
    const { username, photo } = this.state.user

    return (
      <div>
        <div>C-Hub</div>
        { username && <div>{username}</div> } 
      </div>
    )
  }
}