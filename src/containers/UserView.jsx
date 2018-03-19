import React from 'react'
import axios from 'axios'

import {
  Header,
  Profile,
  SeriesList
} from '../components'

export default class UserView extends React.Component {

  constructor(props) {
    super(props)
    const { userId } = props.match.params

    axios.get("/api/user/" + userId)
    .then((res) => {
      this.setState({
        user: res.data
      })
    })
    .catch((err) => {
      console.error(err.response)
    })
  }

  render() {
    if (!this.state) return <div />

    const { user } = this.state

    return ( 
      <div>
        <Header />
        <Profile user={user} />
        <SeriesList series={user.series} />
      </div>
    )
  }
}