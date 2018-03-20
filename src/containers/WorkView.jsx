import React from 'react'
import axios from "axios"
import Util from 'util'

export default class WorkView extends React.Component {

  constructor(props) {
    super(props)
    const { userId, seriesId, workId } = props.match.params

    axios.get(Util.format('/api/work/%s/%s/%s', userId, seriesId, workId))
      .then(res => {
        this.setState({
          work: res.data
        })
      })
      .catch(err => {
        console.error(err.message.data)
      })
  }

  render() {
    if (!this.state) return <div />

    const { work } = this.state
    const { contents } = work.contents

    return (
      <div>
        <h1>{work.title}</h1>
        <p>{contents}</p>
      </div>
    )
  }
}