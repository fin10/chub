import React from 'react'
import PropTypes from 'prop-types'

import './ListItem.scss'

export default class Work extends React.Component {

  static propTypes = {
    work: PropTypes.object.isRequired,
    deletable: PropTypes.bool,
    onWorkDelete: PropTypes.func
  }

  static defaultPropTypes = {
    deletable: false
  }
  
  _handleWorkDelete(e) {
    if (this.props.onWorkDelete) {
      this.props.onWorkDelete(this.props.work)
    }
    e.preventDefault()
  }

  render() {
    const { work, deletable } = this.props

    return (
      <div>
        {deletable && 
          <div 
            className="secondary-content grey-text text-darken-1"
            onClick={this._handleWorkDelete.bind(this)}><i className="material-icons">delete</i></div>
        }
        <div className="header-contents grey-text text-darken-1">{work.owner.id}</div>
        <div className="main-contents">{work.title}</div>
        <div className="sub-contents text-darken-2">{work.type}</div>
        <div className="sub-contents grey-text text-darken-2">Awesomes {work.awesomes.length}</div>
      </div>
    )
  }
}