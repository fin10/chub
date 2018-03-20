import React from 'react'
import axios from 'axios'
import Util from 'util'

import { Link } from 'react-router-dom'

import {
  Header,
  Profile,
  WorkList
} from '../components'

export default class SeriesView extends React.Component {

  constructor(props) {
    super(props)
    const { userId, seriesId } = props.match.params

    axios.get(Util.format('/api/series/%s/%s', userId, seriesId))
      .then(res => {
        this.setState({
          series: res.data.series,
          works: res.data.works
        })
      })
      .catch(err => {
        console.error(err.message.data)
      })
  }

  render() {
    if (!this.state) return <div />

    const { series, works } = this.state
    const { owner } = series

    return ( 
      <div>
        <Header />
        <Profile user={owner} />
        <div>
          <div>{series.title}</div>
          <div>{series.description}</div>
        </div>
        <Link to={Util.format('/%s/%s/new', owner.id, series.id)}>
          <button>New work</button>
        </Link>
        <WorkList works={works} />
      </div>
    )
  }
}