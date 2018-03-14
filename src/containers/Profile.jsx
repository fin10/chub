import React from 'react'
import axios from 'axios'

import ProfilePanel from '../components/ProfilePanel'

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

  componentWillMount() {
    document.body.style.margin = 0;
    document.body.style.padding = 0;
  }

  render() {
    return ( 
      <div>
        <ProfilePanel user={this.state.user} />
      </div>
    )
  }
}