import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Util from 'util'
import { handleError } from '../util/handleError'

export default class NewWork extends React.Component {
  
  static propTypes = {
    match: PropTypes.object.isRequired
  }
  
  constructor(props) {
    super(props)
    this.state = { series: null, types: [] }
    const { userId, seriesId } = this.props.match.params

    this.ref = {
      title: React.createRef(),
      type: React.createRef(),
      contents: React.createRef()
    }

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
      $('select').formSelect()
      $('#error-modal').modal()
    })
  }

  _handleSaveButton() {
    const { userId, seriesId } = this.props.match.params

    axios.post('/api/work/new', {
      userId: userId,
      seriesId: seriesId,
      title: this.ref.title.current.value,
      type: this.ref.type.current.value,
      contents: this.ref.contents.current.value
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
          <input className="validate" type="text" id="new-work-title" data-length="40" ref={this.ref.title} />
          <label htmlFor="new-work-title">Title</label>
        </div>
        <div className="input-field col s12">
          <select ref={this.ref.type}>
            {types.map((type, idx) => <option key={idx} value={type}>{type}</option>)}
          </select>
          <label>Type</label>
        </div>
        <div className="input-field col s12">
          <textarea className="materialize-textarea" id="new-work-contents" ref={this.ref.contents} />
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