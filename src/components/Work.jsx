import React from 'react'
import PropTypes from 'prop-types'

import './ListItem.scss'

export default class Work extends React.Component {

  static propTypes = {
    work: PropTypes.object.isRequired
  }
  
  render() {
    const { work } = this.props

    return (
      <div>
        <div className="header-contents grey-text text-darken-1">{work.owner.id}</div>
        <div className="main-contents">{work.title}</div>
        <div className="sub-contents grey-text text-darken-2">
          <span>Awesomes {work.awesomes.length}</span>
        </div>
      </div>
    )
  }
}