import { Tabs } from 'antd';
import 'antd/dist/antd.css';
import './style/style.css';
import './style/tabStyle.css';
import { Typography } from './Components/Typography';
import { Buttons } from './Components/Buttons';
import { Dropdowns } from './Components/Dropdowns';
import { Checkboxes } from './Components/Checkboxes';
import { InputField } from './Components/InputField';
import { StatCards } from './Components/StatCards';
import { ScrollBars } from './Components/ScrollBars';
import { ModalEl } from './Components/ModalEl';
import { RadioEl } from './Components/RadioEl';
import { Chips } from './Components/Chips';
import { TableEl } from './Components/TableEl';
import { TabsEl } from './Components/TabsEl';

const App = () => (
  <>
    <h1>UNDP Data Future Platform Template</h1>
    <Tabs
      defaultActiveKey='1'
      className='undp-tabs'
    >
      <Tabs.TabPane className='undp-tab-content' tab='Typography' key='1'>
        <Typography />
      </Tabs.TabPane>
      <Tabs.TabPane className='undp-tab-content' tab='Buttons' key='2'>
        <Buttons />
      </Tabs.TabPane>
      <Tabs.TabPane className='undp-tab-content' tab='Selection Dropdown' key='3'>
        <Dropdowns />
      </Tabs.TabPane>
      <Tabs.TabPane className='undp-tab-content' tab='Checkbox' key='4'>
        <Checkboxes />
      </Tabs.TabPane>
      <Tabs.TabPane className='undp-tab-content' tab='Radio Buttons' key='5'>
        <RadioEl />
      </Tabs.TabPane>
      <Tabs.TabPane className='undp-tab-content' tab='Input Field' key='6'>
        <InputField />
      </Tabs.TabPane>
      <Tabs.TabPane className='undp-tab-content' tab='Text Links' key='7'>
        <a href='/' target='_blank'>Hello World</a>
      </Tabs.TabPane>
      <Tabs.TabPane className='undp-tab-content' tab='Stat Cards' key='8'>
        <StatCards />
      </Tabs.TabPane>
      <Tabs.TabPane className='undp-tab-content' tab='Scroll Bar' key='9'>
        <ScrollBars />
      </Tabs.TabPane>
      <Tabs.TabPane className='undp-tab-content' tab='Modal' key='10'>
        <ModalEl />
      </Tabs.TabPane>
      <Tabs.TabPane className='undp-tab-content' tab='Chips' key='11'>
        <Chips />
      </Tabs.TabPane>
      <Tabs.TabPane className='undp-tab-content' tab='Table' key='12'>
        <TableEl />
      </Tabs.TabPane>
      <Tabs.TabPane className='undp-tab-content' tab='Tabs' key='13'>
        <TabsEl />
      </Tabs.TabPane>
    </Tabs>
  </>
);

export default App;
