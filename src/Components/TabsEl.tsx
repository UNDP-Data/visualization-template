import { Tabs } from 'antd';
import '../style/tabStyle.css';

export const TabsEl = () => (
  <div className='margin-bottom07'>
    <Tabs
      defaultActiveKey='1'
      className='undp-tabs'
      items={[
        {
          label: 'Tabs 1',
          key: '1',
          children: <p>Content for Tab 1</p>,
        },
        {
          label: 'Tabs 2',
          key: '2',
          children: <p>Content for Tab 2</p>,
        },
        {
          label: 'Tabs 3',
          key: '3',
          children: <p>Content for Tab 3</p>,
        },
      ]}
    />
  </div>
);
