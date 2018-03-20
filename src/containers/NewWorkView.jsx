import React from 'react'
import axios from 'axios'
import Util from 'util'

export default class NewWork extends React.Component {
  
  constructor(props) {
    super(props)
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
    })
  }

  render() {
    if (!this.state) return <div/>

    return (
      <div>
        <h1>New Work</h1>
        <div className="row">
          <div className="input-field col s12">
            <input className="validate" type="text" id="new-work-title" ref="title" />
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
            <button className="waves-effect waves-light btn" onClick={this._handleSaveButton.bind(this)}>Save</button>
          </div>
        </div>
      </div>
    )
  }
}