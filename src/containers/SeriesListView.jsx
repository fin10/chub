import React from 'react'
import PropTypes from 'prop-types'
import Util from 'util'
import axios from "axios"
import { handleError } from '../util/handleError'

import DocumentTitle from 'react-document-title'
import { Series } from '../components'

export default class SeriesListView extends React.Component {

  static propTypes = {
    match: PropTypes.object.isRequired
  }
  
  constructor(props) {
    super(props)
    this.state = { series: null }
    const { userId } = props.match.params

    axios.get("/api/series/" + userId)
    .then(res => {
      this.setState({
        login: res.data.login,
        series: res.data.series
      })
    })
    .catch(err => {
      handleError(err)
    })
  }

  render() {
    const { login, series } = this.state
    const { userId } = this.props.match.params

    return (
      <DocumentTitle title={userId}>
        <div>
          {login && login.id == userId && <a className="waves-effect waves-light btn" href="/new">New series</a>}
          <div className="collection">
            {series && series.map(item => 
                <a key={item._id} className="collection-item" href={Util.format('/%s/%s', item.owner.id, item.id)}>
                  <Series series={item} />
                </a>
            )}
          </div>
        </div>
      </DocumentTitle>
    )
  }
}