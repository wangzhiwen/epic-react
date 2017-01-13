require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

import {Accordion, AccordionItem} from 'react-sanfona';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// 使用material-ui定义的组件必须包括在这个标签中 此标签中只能放一个子ReactElement
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//自定义表格
import TableExampleSimple from './TableExampleSimple';
import TabsExampleSimple from './TabsExampleSimple';

//自定义AppBar
import AppBarExampleComposition from './AppBarExampleComposition';

//自定义左侧导航1
import ListExampleNested from './ListExampleNested';

// let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  // render() {
  //   return (
  //     <div className="index">
  //       <img src={yeomanImage} alt="Yeoman Generator" />
  //       <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
  //     </div>
  //   );
  // }
  constructor(props) {
    super(props);

    //状态数据，这里只包含了左侧的导航数据
    this.state = {
      sidebardata: [{
        id: 1,
        text: '导航一',
        subitems: [{
          id: 11,
          text: '轮播一'
        }, {
          id: 12,
          text: '轮播二'
        }, {
          id: 13,
          text: '我的表单'
        }, {
          id: 14,
          text: '帮助文档',
          subitems: [{
            id: 141,
            text: '帮助中心'
          }]
        }]
      }, {
        id: 2,
        text: '导航二',
        subitems: []
      }, {
        id: 3,
        text: '导航三',
        subitems: []
      }]
    }

    //实例方法，必须绑定this，否则在方法内部调用this会得到undefined
    this.expand = this.expand.bind(this);
    this.close = this.close.bind(this);
    this.change = this.change.bind(this);
    this.clickhandle = this.clickhandle.bind(this);
  }

  //导航发生变化
  change() {
    console.log('变化')
  }

  //导航展开
  expand() {
    console.log('展开')
  }

  //导航折叠
  close() {
    console.log('折叠')
  }

  //导航的子项目被点击
  clickhandle(event) {
    console.log('您点击了： '+event.target)
  }

  render() {
    return (
      <div className="index">
        {/*网页头部*/}
        <MuiThemeProvider>
          <AppBarExampleComposition />
        </MuiThemeProvider>
        {/*<div className="header">*/}
          {/**/}
        {/*</div>*/}
        {/*网页中部*/}
        <div className="content">
          {/*中部左侧导航*/}
          <div className="left">
            <MuiThemeProvider>
              <ListExampleNested></ListExampleNested>
            </MuiThemeProvider>
            {/*<Accordion onChange={ this.onChange }>*/}
              {/*{this.state.sidebardata.map(function(item) {*/}
                {/*return (*/}
                  {/*<AccordionItem*/}
                    {/*onExpand={ this.expand }*/}
                    {/*onClose={ this.close }*/}
                    {/*className="cn"*/}
                    {/*bodyClassName="bodycn"*/}
                    {/*expandedClassName="expandedcn"*/}
                    {/*title={ item.text }*/}
                    {/*slug={ item.id }*/}
                    {/*key={ item.id}>*/}
                    {/*{item.subitems.map(function(subitem) {*/}
                      {/*return (*/}
                       {/*<div key={ subitem.id } onClick={ this.clickhandle }>{ subitem.text }</div>*/}
                      {/*)*/}
                    {/*},this)}*/}
                  {/*</AccordionItem>*/}
                {/*);*/}
              {/*}, this)}*/}
            {/*</Accordion>*/}
          </div>
          {/*中部右侧内容*/}
          <div className="right">
            {/*黑色主题*/}
            {/*<MuiThemeProvider  muiTheme={getMuiTheme(darkBaseTheme)}>*/}
            {/*默认主题*/}
            <MuiThemeProvider>
              <TabsExampleSimple />
            </MuiThemeProvider>
          </div>
        </div>
        {/*网页脚部*/}
        <div className="footer">
          Copyright © 2013 HANHUA All Rights Reserved 瀚华集团 版权所有
        </div>
      </div>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
