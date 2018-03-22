import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './Profile.scss'

export default class Profile extends React.Component {

  static propTypes = {
    user: PropTypes.object.isRequired
  }

  render() {
    const {
      username,
      email,
      photo,
      follows
    } = this.props.user

    return (
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-image">
              <img src={photo} />
            </div>
            <div className="card-content">
              <div className="card-title">{username}</div>
              <div>{email}</div>              
              <div>Followers { follows ? follows.length : 0 }</div>
            </div>
            <div className="card-action">
              <a>Follow</a> 
            </div>
          </div>
        </div>
      </div>
    )
  }
}