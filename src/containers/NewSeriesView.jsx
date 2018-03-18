import React from 'react'
import axios from 'axios'
import Util from 'util'

export default class NewSeries extends React.Component {

  handleSaveButton() {
    axios.post("/api/series/new", {
      title: this.refs.title.value,
      desc: this.refs.desc.value
    }).then((res) => {
      console.log(res)
      window.location = Util.format("/series/%s", res.data._id)
    }).catch((err) => {
      console.error(err)
    })
  }

  render() {
    return (
      <div>
        <h1>New Series</h1>
        <form>
          <input id="new-series-title" ref="title" />
          <label htmlFor="new-series-title">Title</label>
          <textarea id="new-series-desc" ref="desc" />
          <label htmlFor="new-series-desc">Description</label>
          <button onClick={this.handleSaveButton.bind(this)}>Save</button>
        </form>
      </div>
    )
  }
}