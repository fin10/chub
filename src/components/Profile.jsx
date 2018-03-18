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
      <div>
        <img className="profile-photo" src={photo} />
        <div className="profile-main profile-bottom-margin">{username}</div>
        <div className="profile-sub profile-bottom-margin">{email}</div>
        <div className="profile-sub">Follows { follows ? follows.length : 0 }</div>
      </div>
    )
  }
}