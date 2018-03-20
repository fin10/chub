import React from 'react'
import PropsType from 'prop-types'
import Util from 'util'

import { Link } from 'react-router-dom'

export default class Series extends React.Component {

  static propsType = {
    series: PropsType.object
  }
  
  render() {
    const { series } = this.props

    return (
      <div>
        <Link to={Util.format('/%s/%s', series.owner.id, series.id)}>
          <div>{series.title}</div>
          <div>by {series.owner.username}</div>
        </Link>
      </div>
    )
  }
}