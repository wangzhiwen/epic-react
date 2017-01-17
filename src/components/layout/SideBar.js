/**
 * Created by ThinkPad-wzw on 2017/1/16.
 * DESC:
 */
import React from 'react';

class SideBar extends React.Component{

  constructor(props) {
    super(props);

    this.state = {};
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  /* 所有的事件都具有如下属性，其中想获取原生的js事件对象就是 nativeEvent
   boolean bubbles
   boolean cancelable
   DOMEventTarget currentTarget
   boolean defaultPrevented
   number eventPhase
   boolean isTrusted
   DOMEvent nativeEvent
   void preventDefault()
   boolean isDefaultPrevented()
   void stopPropagation()
   boolean isPropagationStopped()
   DOMEventTarget target
   number timeStamp
   string type
  */
  toggle(event) {
    event.stopPropagation();
    event.preventDefault()
    let target = event.nativeEvent.target;
    let parentNode = target.parentNode;
    let grandpaNode = parentNode.parentNode;
    let uls = grandpaNode.getElementsByTagName('ul');

    let height = parentNode.style.height;
    if(height == ''){
      let as = parentNode.getElementsByTagName('a');
      let newHeight = as.length * 40 + 'px';

      for(let i=0;i<uls.length;i++){
        let ul = uls[i];
        if(ul.style.height != ''){
          ul.style.height = '';
        }
      }
      parentNode.style.height = newHeight;
    }else{
      parentNode.style.height = '';
    }
  }

  render() {
    return (
      <div className="accordion" style={this.props.leftoff}>
        <ul className="container">
          <a href="#" onClick={this.toggle}>导航一</a>
          <li><a href="#">轮播一</a></li>
          <li><a href="#">轮播二</a></li>
        </ul>
        <ul className="container">
          <a href="#" onClick={this.toggle}>导航二</a>
          <li><a href="#">我的表单</a></li>
          <li><a href="#">我的表格</a></li>
        </ul>
        <ul className="container">
          <a href="#" onClick={this.toggle}>导航三</a>
          <li><a href="#">帮助文档</a></li>
        </ul>
      </div>
    )
  }
}

export default SideBar;
