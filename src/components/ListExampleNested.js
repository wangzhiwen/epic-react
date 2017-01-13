/**
 * Created by ThinkPad-wzw on 2017/1/13.
 * DESC:
 */

import React from 'react';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';

export default class ListExampleNested extends React.Component {

  render() {
    return (
      <div>
        <div>
          <List>
            <ListItem
              primaryText="导航一"
              leftIcon={<ContentSend />}
              primaryTogglesNestedList={true}
              nestedItems={[
                <ListItem
                  key={1}
                  primaryText="选项卡组件"
                  leftIcon={<ActionGrade />}
                />,
                <ListItem
                  key={2}
                  primaryText="表单"
                  leftIcon={<ContentSend />}
                  primaryTogglesNestedList={true}
                  nestedItems={[
                    <ListItem key={1} primaryText="表单组件" leftIcon={<ActionGrade />} />,
                  ]}
                />,
                <ListItem
                  key={3}
                  primaryText="表格"
                  leftIcon={<ContentSend />}
                  primaryTogglesNestedList={true}
                  nestedItems={[
                    <ListItem key={1} primaryText="表格组件" leftIcon={<ActionGrade />} />,
                  ]}
                />,
              ]}
            />
            <ListItem primaryText="导航二" leftIcon={<ContentSend />} />
            <ListItem primaryText="导航三" leftIcon={<ContentSend />} />
          </List>
        </div>
      </div>
    );
  }
}
