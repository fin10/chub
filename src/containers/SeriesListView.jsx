import React from 'react'
import Util from 'util'
import axios from "axios"

import { Series } from '../components'

export default class SeriesListView extends React.Component {

  constructor(props) {
    super(props)
    this.state = { series: null }
    const { userId } = props.match.params

    axios.get("/api/series/" + userId)
    .then(res => {
      this.setState({
        series: res.data,
      })
    })
    .catch(err => {
      console.error(err.response)
    })    
  }

  render() {
    const { series } = this.state

    return (
      <div>
        <a className="waves-effect waves-light btn" href="/new">New series</a>
        <div className="collection">
          {series && series.map(item => 
              <a key={item._id} className="collection-item" href={Util.format('/%s/%s', item.owner.id, item.id)}>
                <Series series={item} />
              </a>
          )}
        </div>
      </div>
    )
  }
}