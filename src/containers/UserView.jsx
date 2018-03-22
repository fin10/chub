import React from "react"
import axios from "axios"

import { Header, Profile, SeriesList } from "../components"

export default class UserView extends React.Component {

  constructor(props) {
    super(props)
    const { userId } = props.match.params

    axios.get("/api/user/" + userId)
    .then(res => {
      this.setState({
        user: res.data
      })
    })
    .catch(err => {
      console.error(err.response)
    })
  }

  render() {
    if (!this.state) return <div />

    const { user } = this.state

    return ( 
      <div>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col s3">
              <Profile user={user} />
            </div>
            <div className="col s9">
              <a className="waves-effect waves-light btn" href="/new">New series</a>
              <SeriesList series={user.series} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}