import { Tabs } from 'antd';
import '../style/tabStyle.css';

export const TabsEl = () => (
  <div className='margin-bottom07'>
    <Tabs
      defaultActiveKey='1'
      className='undp-tabs'
    >
      <Tabs.TabPane className='undp-tab-content' tab='Tabs 1' key='1'>
        <p>Content for Tab 1</p>
      </Tabs.TabPane>
      <Tabs.TabPane className='undp-tab-content' tab='Tab 2' key='2'>
        <p>Content for Tab 2</p>
      </Tabs.TabPane>
      <Tabs.TabPane className='undp-tab-content' tab='Tab 3' key='3'>
        <p>Content for Tab 3</p>
      </Tabs.TabPane>
    </Tabs>
  </div>
);
