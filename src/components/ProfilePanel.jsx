import React from 'react'
import PropTypes from 'prop-types'

export default class ProfilePanel extends React.Component {

  static propTypes = {
    users: PropTypes.array.isRequired,
    color: PropTypes.string
  }

  static defaultProps = {
    color: 'black'
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { users, color } = this.props

    return (
      <div>
        {users.map(user => {
          return (
            <a key={user.id} href={"/" + user.id} style={{ color: color, display: 'inline-block', margin: '0 10px' }}>
              <div>
                <img className="circle" src={user.photo} style={{ height: '48px' }}/>
                <div style={{ fontSize: '14px' }}>{user.username}</div>
                <div style={{ fontSize: '10px' }}>Follows {user.follows.length}</div>
                <div style={{ fontSize: '10px' }}>Series {user.series.length}</div>
              </div>
            </a>
          )
        })}
      </div>
    )
  }
}