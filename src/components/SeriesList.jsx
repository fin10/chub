import React from 'react'
import PropTypes from 'prop-types'
import Util from 'util'

import { Series } from './'

export default class SeriesList extends React.Component {

  static propTypes = {
    series: PropTypes.array.isRequired,
  }

  render() {
    const { series } = this.props

    return (
      <div className="collection">
        {
          series.map(item => 
            <a key={item._id} className="collection-item" href={Util.format('/%s/%s', item.owner.id, item.id)}>
              <Series series={item} />
            </a>
          )
        }
      </div>
    )
  }
}