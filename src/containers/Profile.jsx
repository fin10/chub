import React from 'react'
import axios from 'axios'

export default class App extends React.Component {

  constructor(props) {
    super(props)
    const { id } = props.match.params

    this.state = {}

    axios.get('/api/user/' + id)
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
    return ( 
      <div>
        <h1>{ this.state.user && this.state.user.username }</h1>
      </div>
    )
  }
}