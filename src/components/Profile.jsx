import React from 'react'
import axios from 'axios'
import Util from 'util'

export default class Profile extends React.Component {

  constructor(props) {
    super(props)
    this.state = { user: null }
    const ids = props.location.pathname.split('/').filter(id => id.length > 0)
    const userId = ids[0]
    const seriesId = ids[1]
    const workId = ids[2]

    let promise
    if (workId) {
      promise = axios.get(Util.format('/api/work/%s/%s/%s', userId, seriesId, workId))
                  .then(res => {
                    this.setState({
                      user: res.data.owner            
                    })
                  })
    } else {
      promise = axios.get((userId && userId != 'new') ? ('/api/user/' + userId) : '/auth/user')
                  .then(res => {
                    this.setState({
                      user: res.data
                    })
                  })  
    }

    promise.catch(err => {
      console.error(err.response)
    })
  }

  render() {
    const { user } = this.state

    return (user &&
      <div className="card">
        <div className="card-image">
          <img src={user.photo} />
        </div>
        <div className="card-content">
          <div className="card-title"><a className="grey-text text-darken-4" href={'/' + user.id}>{user.username}</a></div>
          <div><a className="grey-text text-darken-4" href={'mailto:' + user.email}>{user.email}</a></div>
          <div className="grey-text text-darken-4">Followers { user.follows ? user.follows.length : 0 }</div>
        </div>
        <div className="card-action">
          <a>Follow</a> 
        </div>
      </div>
    )
  }
}