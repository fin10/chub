import React from 'react'
import PropTypes from 'prop-types'

import { Work } from './'

export default class WorkList extends React.Component {

  static propTypes = {
    works: PropTypes.array.isRequired
  }

  render() {
    const { works } = this.props

    return (
      <div>
        {works.map(work => <Work key={work._id} work={work} />)}
      </div>
    )
  }
}