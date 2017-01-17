/**
 * Created by ThinkPad-wzw on 2017/1/17.
 * DESC:
 */
import React from 'react'

export default React.createClass({
    render() {
      return (
        <div>您传入的参数是：{ this.props.params.content}</div>
      )
    }
}
)
