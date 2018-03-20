import React from 'react'
import PropsType from 'prop-types'
import Util from 'util'

import { Link } from 'react-router-dom'

export default class Work extends React.Component {

  static propsType = {
    work: PropsType.object
  }
  
  render() {
    const { work } = this.props
    const { series } = work

    return (
      <div>
        <Link to={Util.format('/%s/%s/%s', series.owner.id, series.id, work.id)}>
          <div>{work.title}</div>
          <div>by {work.owner.username}</div>
        </Link>
      </div>
    )
  }
}