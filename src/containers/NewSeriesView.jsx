import React from "react"
import axios from "axios"
import Util from "util"

import { Header } from "../components"

export default class NewSeries extends React.Component {

  componentDidMount() {
    $(document).ready(() => {
      $('.chips').material_chip({
        placeholder: 'Enter a tag',
        secondaryPlaceholder: '+Tag',
      })
      $('#error-modal').modal()
    })
  }

  _handleSaveButton() {
    axios.post('/api/series/new', {
      title: this.refs.title.value,
      desc: this.refs.desc.value,
      tags: $('.chips').material_chip('data').map(data => data.tag)
    }).then(res => {
      const series = res.data
      console.log(series)
      window.location = Util.format('/%s/%s', series.owner.id, series.id)
    }).catch(err => {
      console.error(err.response.data)
      let modelMessage = $('#modal-message')
      modelMessage.empty()
      modelMessage.append(Util.format('<p>%s</p>', err.response.data))
      $('#error-modal').modal('open')
    })
  }

  _handleConfirmModalButton() {
    $('#error-modal').modal('close')
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col">
              <h4>New Series</h4>
            </div>
            <div className="input-field col s12">
              <input id="new-series-title" className="validate" type="text" data-length="40" ref="title" />
              <label htmlFor="new-series-title">Title</label>
            </div>
            <div className="input-field col s12">
              <textarea id="new-series-desc" className="materialize-textarea" data-length="200" ref="desc"></textarea>
              <label htmlFor="new-series-desc">Description</label>
            </div>
            <div className="input-field col s12">
              <div id="new-series-tags" className="chips" ref="tags"></div>
            </div>
          </div>
          <a className="waves-effect waves-light btn" onClick={this._handleSaveButton.bind(this)}>Save</a>
        </div>
        <div id="error-modal" className="modal">
          <div className="modal-content">
            <h4>Error</h4>
            <div id="modal-message" />
          </div>
          <div className="modal-footer">
            <a onClick={this._handleConfirmModalButton.bind(this)} className="modal-action modal-close waves-effect waves-green btn-flat">Confirm</a>
          </div>
        </div>
      </div>
    )
  }
}