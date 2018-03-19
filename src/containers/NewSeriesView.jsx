import React from 'react'
import axios from 'axios'
import Util from 'util'

export default class NewSeries extends React.Component {

  handleSaveButton() {
    axios.post("/api/series/new", {
      title: this.refs.title.value,
      desc: this.refs.desc.value
    }).then(res => {
      const series = res.data
      console.log(series)
      window.location = Util.format("/%s/%s", series.owner.id, series.id)
    }).catch(err => {
      console.error(err.response.data)
    })
  }

  render() {
    return (
      <div>
        <h1>New Series</h1>
        <input id="new-series-title" ref="title" />
        <label htmlFor="new-series-title">Title</label>
        <textarea id="new-series-desc" ref="desc" />
        <label htmlFor="new-series-desc">Description</label>
        <button onClick={this.handleSaveButton.bind(this)}>Save</button>
      </div>
    )
  }
}