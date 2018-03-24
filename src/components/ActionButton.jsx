import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import './ActionButton.scss'

export default class ActionButton extends React.Component {

  static propTypes = {
    id: PropTypes.string,
    text: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    active: PropTypes.bool,
    onClick: PropTypes.func
  }

  static defaultProps = {
    text: 'empty',
    count: 0,
    active: false
  }

  _handleTextClick(e) {
    const { id, onClick } = this.props
    if (onClick) {
      onClick(id)
    }
  }

  render() {
    const { text, count, active } = this.props

    return (
      <div className="ab">
        <div className={classnames('ab-txt', { active: active })} onClick={this._handleTextClick.bind(this)}>{text}</div>
        <div className="ab-cnt">{count}</div>
      </div>
    )
  }
}