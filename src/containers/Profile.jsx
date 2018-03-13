import React from 'react'

export default class App extends React.Component {

  render() {
    return ( 
      <div>
        <h1>{ this.props.user.username }</h1>
      </div>
    )
  }
}