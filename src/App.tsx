import { Tabs } from 'antd';
import './style/antd.css';
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
import { SliderEl } from './Components/Slider';
import { SegmentedEl } from './Components/SegmentedEl';
import { SwitchEl } from './Components/SwitchEl';
import { HeaderEl } from './Components/HeaderEl';

const items = [
  {
    label: 'Typography',
    key: '1',
    children: <Typography />,
  },
  {
    label: 'Buttons',
    key: '2',
    children: <Buttons />,
  },
  {
    label: 'Dropdown',
    key: '3',
    children: <Dropdowns />,
  },
  {
    label: 'Checkbox',
    key: '4',
    children: <Checkboxes />,
  },
  {
    label: 'Radio Button',
    key: '5',
    children: <RadioEl />,
  },
  {
    label: 'Input Field',
    key: '6',
    children: <InputField />,
  },
  {
    label: 'Text Link',
    key: '7',
    children: <a href='/' target='_blank' className='undp-style'>Hello World</a>,
  },
  {
    label: 'Stat Cards',
    key: '8',
    children: <StatCards />,
  },
  {
    label: 'Scroll Bar',
    key: '9',
    children: <ScrollBars />,
  },
  {
    label: 'Modal',
    key: '10',
    children: <ModalEl />,
  },
  {
    label: 'Chips',
    key: '11',
    children: <Chips />,
  },
  {
    label: 'Table',
    key: '12',
    children: <TableEl />,
  },
  {
    label: 'Tabs',
    key: '13',
    children: <TabsEl />,
  },
  {
    label: 'Slider',
    key: '14',
    children: <SliderEl />,
  },
  {
    label: 'Segmented',
    key: '15',
    children: <SegmentedEl />,
  },
  {
    label: 'Switch',
    key: '16',
    children: <SwitchEl />,
  },
  {
    label: 'Loader',
    key: '17',
    children: <div className='undp-loader' />,
  },
];
const App = () => (
  <div className='undp-container'>
    <HeaderEl />
    <div style={{ marginTop: '10rem' }}>
      <Tabs
        defaultActiveKey='1'
        className='undp-tabs'
        items={items}
      />
    </div>
  </div>
);

export default App;
