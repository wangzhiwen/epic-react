/**
 * Created by ThinkPad-wzw on 2017/1/17.
 * DESC:
 */
import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render() {
    return <Link {...this.props} activeClassName="active"/>
  }
})
