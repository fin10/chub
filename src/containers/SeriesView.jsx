import React from 'react'
import axios from 'axios'
import Util from 'util'

import { Work, ActionButton } from '../components'

import './SeriesView.scss'
import '../components/Tag.scss'

export default class SeriesView extends React.Component {

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
        console.error(err.message.data)
      })
  }

  _handleActionButtonClick(id) {
    const { userId, seriesId } = this.props.match.params

    let url = null
    switch (id) {
      case 'awesomeButton':
        url = Util.format('/api/action/awesome?userId=%s&seriesId=%s', userId, seriesId)
        break;
      case 'followButton':
        url = Util.format('/api/action/follow?userId=%s&seriesId=%s', userId, seriesId)
        break;
      case 'folkButton':
        url = Util.format('/api/action/folk?userId=%s&seriesId=%s', userId, seriesId)
        break;
    }

    if (url) {
      axios.post(url)
          .then(res => {
            this.setState({
              series: res.data
            })
          })
          .catch(err => {
            console.error(err.response)
          })
    }
  }

  render() {
    const { login, series } = this.state
    const { userId, seriesId } = this.props.match.params

    return (series && 
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
                {login.id == userId && 
                  <td>
                    <a className="waves-effect waves-light btn" href={Util.format('/%s/%s/new', userId, seriesId)}>New work</a>
                  </td>
                }
                <td className="actions">
                  <ActionButton
                    id="awesomeButton"
                    text="Awesomes" 
                    count={series.awesomes.length} 
                    active={login.id in series.awesomes} 
                    onClick={this._handleActionButtonClick.bind(this)} />
                  <ActionButton 
                    id="followButton"
                    text="Follows" 
                    count={series.follows.length} 
                    active={login.id in series.follows} 
                    onClick={this._handleActionButtonClick.bind(this)} />
                  <ActionButton 
                    id="folkButton"
                    text="Folks" 
                    count={series.folks.length} 
                    active={login.id in series.folks} 
                    onClick={this._handleActionButtonClick.bind(this)} />
                </td>
              </tr>
            </tbody>
          </table>
        }
        <div className="collection">
          {series.works.map(item => 
            <a key={item._id} className="collection-item" href={Util.format('/%s/%s/%s', userId, seriesId, item.id)}>
              <Work work={item} />
            </a>
          )}
        </div>
      </div>
    )
  }
}