import React from 'react'
import PropTypes from 'prop-types'

import { Series } from './'

import { Link } from 'react-router-dom'

import 'materialize-css/sass/materialize.scss'

export default class SeriesList extends React.Component {

  static propTypes = {
    series: PropTypes.array.isRequired,
  }

  static defaultProps = {
    series: []
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { series } = this.props

    return (
      <div>
        <Link to="/new">
          <button>New series</button>
        </Link>
        <div>
        { series.map(item => <Series key={item._id} series={item} />) }
        </div>
      </div>
    )
  }
}