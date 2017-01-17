/**
 * Created by ThinkPad-wzw on 2017/1/16.
 * DESC:
 */
require('./style/layout.css')

import React from 'react';

import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';

import NavLink from '../link/NavLink'

class MyHeader extends React.Component{

  //构造函数
  constructor(props) {
    super(props);

    //初始化状态
    this.state = { showSidebar: false }

    //给方法绑定实例
    this.toggleSidebar = this.toggleSidebar.bind(this);

    this.gotoHelp = this.gotoHelp.bind(this);
  }

  //定义实例方法
  toggleSidebar() {
    this.props.toggleSideBar();
  }

  gotoHelp() {
    alert(123);
  }

  //渲染方法
  render() {
    return (
      <div className="header">
        <div className="sidebarHandler" onClick={ this.toggleSidebar }>
          <li></li>
          <li className="center"></li>
          <li></li>
        </div>
        <div className="leftBtns">
          {/*暂时没有内容*/}
        </div>
        <div className="rightBtns">
          <div>
            <NavDropdown pullRight eventKey={1} title="我的工作台" id="basic-nav-dropdown3">
              <MenuItem eventKey={1.1}>产品中心</MenuItem>
              <MenuItem eventKey={1.2}>客户中心</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={1.3} onClick={this.gotoHelp}>帮助文档</MenuItem>
            </NavDropdown>
          </div>
          <div>
            <NavLink activeStyle={{ color: 'red' }} to="/help/production">帮助中心</NavLink>
          </div>
          <div>
            <NavLink activeStyle={{ color: 'red' }} to="/about/address">关于我们</NavLink>
          </div>
        </div>
      </div>
    )
  }
}

MyHeader.defaultProps = {};

export default MyHeader;
