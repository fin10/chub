import React from 'react'
import axios from 'axios'
import Util from 'util'

import {
  Header,
  Profile,
  WorkList
} from '../components'

export default class SeriesView extends React.Component {

  constructor(props) {
    super(props)
    const { userId, seriesId } = props.match.params

    axios.get(Util.format("/api/series/%s/%s", userId, seriesId))
      .then((res) => {
        this.setState({
          series: res.data
        })
      })
      .catch((err) => {
        console.error(err.message.data)
      })
  }

  render() {
    if (!this.state) return <div />

    const { series } = this.state
    const { owner, works } = series

    return ( 
      <div>
        <Header />
        <Profile user={owner} />
        <div>
          <div>{series.title}</div>
          <div>{series.description}</div>
        </div>
        <WorkList works={works} />
      </div>
    )
  }
}