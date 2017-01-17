/**
 * Created by ThinkPad-wzw on 2017/1/16.
 * DESC:
 */
require('./style/layout.css')

import React from 'react';

import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';

class MyHeader extends React.Component{

  //构造函数
  constructor(props) {
    super(props);

    //初始化状态
    this.state = { showSidebar: false }

    //给方法绑定实例
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  //定义实例方法
  toggleSidebar() {
    this.props.toggleSideBar();
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
            <NavDropdown pullRight eventKey={3} title="我的工作台" id="basic-nav-dropdown3">
              <MenuItem eventKey={3.1}>产品中心</MenuItem>
              <MenuItem eventKey={3.2}>客户中心</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>帮助文档</MenuItem>
            </NavDropdown>
          </div>
          <div>
            <NavDropdown pullRight eventKey={3} title="帮助中心" id="basic-nav-dropdown4">
              <MenuItem eventKey={3.1}>产品帮助</MenuItem>
              <MenuItem eventKey={3.2}>账户帮助</MenuItem>
              <MenuItem eventKey={3.3}>操作手册</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>自助服务</MenuItem>
            </NavDropdown>
          </div>
          <div>
            <NavDropdown pullRight eventKey={3} title="关于我们" id="basic-nav-dropdown4">
              <MenuItem eventKey={3.1}>企业文化</MenuItem>
              <MenuItem eventKey={3.2}>组织架构</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>公司荣誉</MenuItem>
            </NavDropdown>
          </div>
          <div>
            <a href="#">404页面</a>
          </div>
        </div>
      </div>
    )
  }
}

MyHeader.defaultProps = {};

export default MyHeader;
