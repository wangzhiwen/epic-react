require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

import MyHeader from './layout/MyHeader'
import SideBar from './layout/SideBar'
// let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sidebarleftoff: {
        left: '-300px'
      }
    }

    this.toggleSideBar = this.toggleSideBar.bind(this);
  }

  toggleSideBar() {
    if(this.state.sidebarleftoff.left == '-300px'){
      this.setState({sidebarleftoff:  {
        left: '0px'
      }});
    }else{
      this.setState({sidebarleftoff:  {
        left: '-300px'
      }});
    }
  }

  render() {
    return (
      <div className="index">
        {/*网页头部*/}
        <MyHeader toggleSideBar={this.toggleSideBar}/>
        {/*网页中部*/}
        <div className="content" onClick={this.toggleSideBar}>
          <div className="left">
            <SideBar leftoff={this.state.sidebarleftoff} />
          </div>
          <div className="right">
            {/* add this */}
            {this.props.children}
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

// AppComponent.defaultProps = {};

export default AppComponent;
