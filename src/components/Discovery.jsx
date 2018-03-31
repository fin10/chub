import React from 'react'
import Graph from 'react-graph-vis'
import axios from 'axios'
import handleError from '../util/handleError'
import randomColor from 'randomcolor'

export default class Discovery extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      graph: null
    }

    this.opts = {
      nodes: {
        shape: 'dot',
        font: {
          color: 'white'
        },
      },
      edges: {
        width: 1,
        smooth: {
          type: 'dynamic'
        }
      },
      interaction: {
        hover: true
      }
    }

    this.events = {
      select: this._handleNodeSelect
    }

    this._makeGraph()
  }

  _makeGraph() {
    const graph = {
      nodes: [],
      edges: []
    }

    Promise.all([axios.get('/api/user'), axios.get('/api/series'), axios.get('/api/work')])
          .then(res => {
            const users = res[0].data
            const series = res[1].data
            const works = res[2].data
            let colors = {}

            users.forEach(user => {
              colors[user._id] = randomColor({luminosity: 'light'})

              graph.nodes.push({
                id: user._id,
                label: user.id,
                shape: 'circularImage',
                image: user.photo,
                size: 20,
                color: colors[user._id]
              })
            })

            series.forEach(series => {
              graph.nodes.push({
                id: series._id,
                label: series.title,
                size: 20,
                color: colors[series.owner]
              })
            })

            works.forEach(work => {
              graph.nodes.push({
                id: work._id,
                label: work.title,
                size: 10,
                color: colors[work.owner]
              })
            })

            users.forEach(user => {
              user.series.forEach(series => {
                graph.edges.push({
                  from: user._id, to: series,
                  arrows: { to: { enabled: false } }
                })
              })
            })

            series.forEach(series => {
              series.works.forEach(work => {
                graph.edges.push({
                  from: series._id, to: work,
                  arrows: { to: { enabled: false } }
                })
              })
            })
            
            this.setState({ graph: graph })
          })
          .catch(err => {
            handleError(err)
          })
  }

  _handleNodeSelect(event) {
    console.log(event)
  }

  render() {
    return (this.state.graph &&
        <Graph 
          graph={this.state.graph} 
          options={this.opts}
          events={this.events} />      
    )
  }
}