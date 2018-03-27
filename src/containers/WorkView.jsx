import React from 'react'
import axios from "axios"
import Util from 'util'
import { handleError } from '../util/handleError'

import DocumentTitle from 'react-document-title'
import ReactMarkdown  from 'react-markdown'

import './WorkView.scss'

export default class WorkView extends React.Component {

  constructor(props) {
    super(props)
    this.state = { work: null }
    const { userId, seriesId, workId } = props.match.params

    axios.get(Util.format('/api/work/%s/%s/%s', userId, seriesId, workId))
      .then(res => {
        this.setState({
          work: res.data
        })
      })
      .catch(err => {
        handleError(err)        
      })
  }

  render() {
    const { work } = this.state

    return (work &&
      <DocumentTitle title={work.title}>
        <div>
          <h5><a className="grey-text text-darken-4" href={Util.format('/%s/%s', work.series.owner.id, work.series.id)}>{work.series.title}</a></h5>
          <h1 className="work-title">{work.title}</h1>
          <div className="work">
            <ReactMarkdown 
              source={work.contents.body}
              escapeHtml={false} />
          </div>
        </div>
      </DocumentTitle>
    )
  }
}