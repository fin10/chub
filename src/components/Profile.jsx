import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Util from 'util'

export default class Profile extends React.Component {

  static propTypes = {
    location: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = { login: null, user: null }
    const ids = props.location.pathname.split('/').filter(id => id.length > 0)
    const userId = ids[0]
    const seriesId = ids[1]
    const workId = ids[2]

    let promise
    if (workId && workId != 'new') {
      promise = axios.get(Util.format('/api/work/%s/%s/%s', userId, seriesId, workId))
                  .then(res => {
                    this.setState({
                      login: res.data.login,
                      user: res.data.owner
                    })
                  })
    } else if (userId && userId != 'new') {
      promise = axios.get('/api/user/' + userId)
                  .then(res => {
                    this.setState({
                      login: res.data.login,
                      user: res.data.user
                    })
                  })  
    } else {
      promise = axios.get('/auth/user')
                  .then(res => {
                    this.setState({
                      login: res.data,
                      user: res.data
                    })
                  })  
    }

    promise.catch(err => {
      console.error(err.response)
    })
  }

  render() {
    const { login, user } = this.state

    return (user &&
      <div className="card">
        <div className="card-image">
          <img src={user.photo} />
        </div>
        <div className="card-content">
          <a className="card-title grey-text text-darken-4" href={'/' + user.id}>{user.username}</a>
          <a className="grey-text text-darken-4" href={'mailto:' + user.email}>{user.email}</a>
          <div className="grey-text text-darken-4">Followers { user.follows ? user.follows.length : 0 }</div>
        </div>
        {login && login.id != user.id && 
          <div className="card-action">
            <a>Follow</a> 
          </div>
        }
      </div>
    )
  }
}