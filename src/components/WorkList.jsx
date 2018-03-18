import React from 'react'
import PropTypes from 'prop-types'

export default class WorkList extends React.Component {

  static propTypes = {
    works: PropTypes.array
  }

  static defaultProps = {
    works: []
  }

  render() {
    return (
      <div>
      </div>
    )
  }
}