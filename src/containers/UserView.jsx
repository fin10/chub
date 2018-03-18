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
    const { id } = props.match.params

    axios.get("/api/user/" + id)
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
    if (!this.state) return <div />

    const { user } = this.state
    const { series } = user

    return ( 
      <div>
        <Header />
        <Profile user={user} />
        <SeriesList series={series} />
      </div>
    )
  }
}