import React from 'react'
import PropTypes from 'prop-types'

import { Series } from './'

export default class SeriesList extends React.Component {

  static propTypes = {
    series: PropTypes.array.isRequired,
  }

  render() {
    const { series } = this.props

    return (
      <div>
        {series.map(item => <Series key={item._id} series={item} />)}
      </div>
    )
  }
}