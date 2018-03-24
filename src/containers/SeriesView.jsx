import React from 'react'
import axios from 'axios'
import Util from 'util'

import { Work } from '../components'

import './SeriesView.scss'
import '../components/Tag.scss'

export default class SeriesView extends React.Component {

  constructor(props) {
    super(props)
    this.state = { series: null }
    const { userId, seriesId } = this.props.match.params

    axios.get(Util.format('/api/series/%s/%s', userId, seriesId))
      .then(res => {
        this.setState({
          login: res.data.login,
          series: res.data.series,
        })
      })
      .catch(err => {
        console.error(err.message.data)
      })
  }

  render() {
    const { login, series } = this.state
    const { userId, seriesId } = this.props.match.params

    return (series && 
      <div>
        <div id="series-section">
          <h4>{series.title}</h4>
          <p>{series.description}</p>
          {series.tags && 
            <div>
              {series.tags.map(tag => <div key={tag} className="tag">#{tag}</div>)}
            </div>
          }
        </div>
        {login && login.id == userId &&
          <a className="waves-effect waves-light btn" href={Util.format('/%s/%s/new', userId, seriesId)}>New work</a>
        }
        <div className="collection">
          {series.works.map(item => 
            <a key={item._id} className="collection-item" href={Util.format('/%s/%s/%s', userId, seriesId, item.id)}>
              <Work work={item} />
            </a>
          )}
        </div>
      </div>
    )
  }
}