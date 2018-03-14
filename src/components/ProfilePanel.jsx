import React from 'react'
import PropTypes from 'prop-types'
import './ProfilePanel.css'

export default class ProfilePanel extends React.Component {

  static propTypes = {
    user: PropTypes.object
  }

  static defaultProps = {
    user: {
      username: 'empty',
      email: null,
      photo: '',
      follows: []
    }
  }

  render() {
    const {
      username,
      email,
      photo,
      follows
    } = this.props.user

    return (
      <div className="profile-panel">
        <div>
          <img className="profile-photo" src={photo} />
          <div className="profile-main profile-bottom-margin">{username}</div>
          <div className="profile-sub profile-bottom-margin">{email}</div>
          <div className="profile-sub">Follows { follows ? follows.length : 0 }</div>
        </div>
      </div>
    )
  }
}