import React from "react"
import axios from "axios"
import Util from "util"
import { handleError } from '../util/handleError'

export default class NewSeries extends React.Component {

  constructor(props) {
    super(props)
    this.ref = {
      title: React.createRef(),
      desc: React.createRef(),
      tags: React.createRef()
    }
  }

  componentDidMount() {
    $(document).ready(() => {
      $('.chips-placeholder').chips({
        placeholder: 'Enter a tag',
        secondaryPlaceholder: '+Tag',
      })
      
      $('#error-modal').modal()
    })
  }

  _handleSaveButton() {
    const chips = window.M.Chips.getInstance(this.ref.tags.current)
    
    axios.post('/api/series/new', {
      title: this.ref.title.current.value,
      desc: this.ref.desc.current.value,
      tags: chips.chipsData.map(data => data.tag)
    }).then(res => {
      const series = res.data
      window.location = Util.format('/%s/%s', series.owner.id, series.id)
    }).catch(err => {
      handleError(err)

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
        <div>
          <div className="col s12">
            <h4>New Series</h4>
          </div>
          <div className="input-field col s12">
            <input id="new-series-title" className="validate" type="text" data-length="40" ref={this.ref.title} />
            <label htmlFor="new-series-title">Title</label>
          </div>
          <div className="input-field col s12">
            <textarea id="new-series-desc" className="materialize-textarea" data-length="200" ref={this.ref.desc}></textarea>
            <label htmlFor="new-series-desc">Description</label>
          </div>
          <div className="input-field col s12">
            <div id="new-series-tags" className="chips chips-placeholder" ref={this.ref.tags}></div>
          </div>
          <div className="col s12">
            <a className="right waves-effect waves-light btn" onClick={this._handleSaveButton.bind(this)}>Save</a>
          </div>
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