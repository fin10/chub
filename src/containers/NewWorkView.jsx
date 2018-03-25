import React from 'react'
import axios from 'axios'
import Util from 'util'
import { handleError } from '../util/handleError'

export default class NewWork extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = { series: null, types: [] }
    const { userId, seriesId } = this.props.match.params

    axios.get(Util.format('/api/series/%s/%s', userId, seriesId))
      .then(res => {
        this.setState({
          series: res.data.series
        })
      })
      .catch(err => {
        handleError(err)
      })

    axios.get('/api/work/types')
      .then(res => {
        this.setState({
          types: res.data
        })
      })
      .catch(err => {
        handleError(err)
      })
  }

  componentDidUpdate() {
    $(document).ready(() => {
      $('select').material_select()
      $('#error-modal').modal()
    })
  }

  _handleSaveButton() {
    const { userId, seriesId } = this.props.match.params

    axios.post('/api/work/new', {
      userId: userId,
      seriesId: seriesId,
      title: this.refs.title.value,
      type: this.refs.type.value,
      contents: this.refs.contents.value
    }).then(res => {
      window.location = Util.format('/%s/%s/%s', userId, seriesId, res.data.id)
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
    const { series, types } = this.state

    return (
      <div>
        <div className="col s12">
          {series && <h6>{series.title}</h6>}
          <h4>New Work</h4>
        </div>
        <div className="input-field col s12">
          <input className="validate" type="text" id="new-work-title" data-length="40" ref="title" />
          <label htmlFor="new-work-title">Title</label>
        </div>
        <div className="input-field col s12">
          <select ref="type">
            {types.map((type, idx) => <option key={idx} value={type}>{type}</option>)}
          </select>
          <label>Type</label>
        </div>
        <div className="input-field col s12">
          <textarea className="materialize-textarea" id="new-work-contents" ref="contents" />
          <label htmlFor="new-work-contents">Contents</label>
        </div>
        <div className="input-field col s12">
          <a className="right waves-effect waves-light btn" onClick={this._handleSaveButton.bind(this)}>Save</a>
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