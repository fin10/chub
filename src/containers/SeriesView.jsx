import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Util from 'util'
import { handleError } from '../util/handleError'

import DocumentTitle from 'react-document-title'
import { Work, ActionButton } from '../components'

import './SeriesView.scss'
import '../components/Tag.scss'

export default class SeriesView extends React.Component {

  static propTypes = {
    match: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = { series: null }
    const { userId, seriesId } = this.props.match.params

    axios.get(Util.format('/api/series/%s/%s', userId, seriesId))
      .then(res => {
        this.setState({
          login: res.data.login,
          series: res.data.series,
        })
      })
      .catch(err => {
        handleError(err)
      })
  }

  _handleWorkDelete(work) {
    const { userId, seriesId } = this.props.match.params    
    axios.delete(Util.format('/api/work/%s/%s/%s', userId, seriesId, work.id))
        .then(res => {
          let { series } = this.state
          series.works = series.works.filter(work => work.id != res.data.id)
          this.setState({ series: series })
        })
        .catch(err => {
          handleError(err)
        })
  }

  _handleActionButtonClick(id) {
    let { series } = this.state
    const { userId, seriesId } = this.props.match.params

    let promise = null
    switch (id) {
      case 'awesomeButton':
        promise = axios.post(Util.format('/api/action/awesome?userId=%s&seriesId=%s', userId, seriesId))
                      .then(res => {
                        series.awesomes = res.data
                        this.setState({ series: series })
                      })
        break;
      case 'followButton':
        promise = axios.post(Util.format('/api/action/follow?userId=%s&seriesId=%s', userId, seriesId))
                      .then(res => {
                        series.follows = res.data
                        this.setState({ series: series })
                      })
        break;
      case 'folkButton':
        promise = axios.post(Util.format('/api/action/folk?userId=%s&seriesId=%s', userId, seriesId))
                      .then(res => {
                        series.folks = res.data
                        this.setState({ series: series })
                      })
        break;
    }

    if (promise) {
      promise.catch(err => {
        handleError(err)
      })
    }
  }

  render() {
    const { login, series } = this.state
    const { userId, seriesId } = this.props.match.params

    return (series && 
      <DocumentTitle title={userId + '/' + seriesId} >
        <div>
          <div id="series-section">
            <h4>{series.title}</h4>
            <p>{series.description}</p>
            {series.tags && 
              <div>
                {series.tags.map(tag => <div key={tag} className="tag">#{tag}</div>)}
              </div>
            }
          </div>
          {login &&
            <table>
              <tbody>
                <tr>
                  {(login.id == userId || series.folks.includes(login._id)) && 
                    <td>
                      <a className="waves-effect waves-light btn" href={Util.format('/%s/%s/new', userId, seriesId)}>New work</a>
                    </td>
                  }
                  <td className="actions">
                    <ActionButton
                      id="awesomeButton"
                      text="Awesomes" 
                      count={series.awesomes.length} 
                      active={series.awesomes.includes(login._id)}
                      onClick={this._handleActionButtonClick.bind(this)} />
                    <ActionButton 
                      id="followButton"
                      text="Follows" 
                      count={series.follows.length} 
                      active={series.follows.includes(login._id)}
                      onClick={this._handleActionButtonClick.bind(this)} />
                    <ActionButton 
                      id="folkButton"
                      text="Folks" 
                      count={series.folks.length} 
                      active={series.folks.includes(login._id)}
                      onClick={this._handleActionButtonClick.bind(this)} />
                  </td>
                </tr>
              </tbody>
            </table>
          }
          <div className="collection">
            {series.works.map(item => 
              <a key={item._id} className="collection-item" href={Util.format('/%s/%s/%s', userId, seriesId, item.id)}>
                <Work 
                  work={item} 
                  deletable={login && login._id == item.owner._id} 
                  onWorkDelete={this._handleWorkDelete.bind(this)} />
              </a>
            )}
          </div>
        </div>
      </DocumentTitle>
    )
  }
}