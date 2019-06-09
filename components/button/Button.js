import React, { Component } from 'react'
import Router from 'next/router'
import './btn.css'
class Button extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return <button onClick={this.handleLink}>Button->about</button>
  }
  handleLink() {
    console.log('button')
    Router.push('/about')
  }
}
export default Button
