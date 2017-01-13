/**
 * Created by ThinkPad-wzw on 2017/1/13.
 * DESC:
 */

import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import DropDownMenu from 'material-ui/DropDownMenu';

/**
 * This example is taking advantage of the composability of the `AppBar`
 * to render different components depending on the application state.
 */
class AppBarExampleComposition extends Component {

  render() {
    return (
      <div>
        <AppBar
          className="header"
          title="Title"
          iconElementRight={
            <div>
              <IconButton></IconButton>
              <DropDownMenu value={1}>
                <MenuItem value={1} primaryText="我的工作台" />
                <MenuItem value={2} primaryText="产品中心" />
                <MenuItem value={3} primaryText="客户中心" />
              </DropDownMenu>
              <DropDownMenu value={1}>
                <MenuItem value={1} primaryText="帮助中心" />
              </DropDownMenu>
              <DropDownMenu value={1}>
                <MenuItem value={1} primaryText="关于我们" />
              </DropDownMenu>
            </div>
          }
        />
      </div>
    );
  }
}

export default AppBarExampleComposition;
