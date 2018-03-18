import React from 'react'
import axios from 'axios'

import {
  Header,
  Profile,
  WorkList
} from '../components'

export default class UserView extends React.Component {

  constructor(props) {
    super(props)
    const { id } = props.match.params

    axios.get("/api/series/" + id)
    .then((res) => {
      this.setState({
        series: res.data
      })
    })
    .catch((err) => {
      console.error(err)
    })
  }

  render() {
    if (!this.state) return <div />

    const { series } = this.state
    const { user, works } = series

    return ( 
      <div>
        <Header />
        <Profile user={user} />
        <div>
          <div>series.title</div>
          <div>series.description</div>
        </div>
        <WorkList works={works} />
      </div>
    )
  }
}