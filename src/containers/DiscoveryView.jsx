import React from 'react'
import { Discovery } from '../components'

export default class DiscoveryView extends React.Component {

  render() {
    const style = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    }

    const bgStyle = {
      backgroundImage: 'url("/static/images/bg-discovery.jpg"',
      backgroundRepeat: 're-repeat',
      backgroundSize: 'cover',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      opacity: 0.4
    }

    const titleStyle = {
      position: 'fixed',
      padding: '0 10px',
      fontSize: '40px',
      color: 'white',
    }

    return (
      <div className="grey darken-4" style={style}>
        <div style={bgStyle} />
        <div style={titleStyle}>C-Hub</div>
        <Discovery />
      </div>
    )
  }
}