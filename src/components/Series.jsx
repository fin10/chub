import React from 'react'
import PropsType from 'prop-types'

import './Series.scss'

export default class Series extends React.Component {

  static propsType = {
    series: PropsType.object.isRequired
  }
  
  render() {
    const { series } = this.props

    return (
      <div>
        <div className="header-contents grey-text text-darken-1">{series.owner.id}</div>
        <div className="main-contents">{series.title}</div>
        <div className="sub-contents grey-text text-darken-2">
          <span>Awesomes {series.awesomes.length}</span>
          <span>Follows {series.follows.length}</span>
          <span>Folks {series.folks.length}</span>
        </div>
      </div>
    )
  }
}