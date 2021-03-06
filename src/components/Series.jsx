import React from 'react'
import PropTypes from 'prop-types'

import './ListItem.scss'
import './Tag.scss'

export default class Series extends React.Component {

  static propTypes = {
    series: PropTypes.object.isRequired
  }
  
  render() {
    const { series } = this.props

    return (
      <div>
        <div className="header-contents grey-text text-darken-1">{series.owner.id}</div>
        <div className="main-contents">{series.title}</div>
        {series.tags && 
          <div>
            {series.tags.map(tag => <div key={tag} className="tag">#{tag}</div>)}
          </div>
        }
        <div className="sub-contents grey-text text-darken-2">
          <span>Works {series.works.length}</span>
          <span>Awesomes {series.awesomes.length}</span>
          <span>Follows {series.follows.length}</span>
          <span>Folks {series.folks.length}</span>
        </div>
      </div>
    )
  }
}