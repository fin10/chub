import React from 'react'
import PropsType from 'prop-types'

export default class Series extends React.Component {

  static propsType = {
    series: PropsType.object
  }
  
  render() {
    const { series } = this.props

    return (
      <div>
        <div>{series.title}</div>
        <div>by {series.owner.username}</div>
      </div>
    )
  }
}