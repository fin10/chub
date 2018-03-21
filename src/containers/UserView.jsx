import React from "react"
import axios from "axios"

import { Link } from "react-router-dom"

import {
  Header,
  Profile,
  SeriesList
} from "../components"

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
        <div className="row">
          <div className="col s2">
            <Profile user={user} />
          </div>
          <div className="col s10">
            <a className="waves-effect waves-light btn" href="/new">New series</a>
            <SeriesList series={user.series} />
          </div>
        </div>
      </div>
    )
  }
}