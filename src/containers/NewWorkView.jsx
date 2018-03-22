import React from 'react'
import axios from 'axios'
import Util from 'util'

export default class NewWork extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = { types: [] }

    axios.get('/api/work/types')
      .then(res => {
        this.setState({
          types: res.data
        })
      })
      .catch(err => {
        console.error(err.response.data)
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
      const work = res.data
      console.log(work)
      window.location = Util.format('/%s/%s/%s', userId, seriesId, work.id)
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
        <div className="col s12">
          <h4>New Work</h4>
        </div>
        <div className="input-field col s12">
          <input className="validate" type="text" id="new-work-title" data-length="40" ref="title" />
          <label htmlFor="new-work-title">Title</label>
        </div>
        <div className="input-field col s12">
          <select ref="type">
            {this.state.types.map((type, idx) => <option key={idx} value={type}>{type}</option>)}
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