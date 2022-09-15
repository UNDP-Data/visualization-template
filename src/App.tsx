import {
  Checkbox, Input, Radio, Select, Tabs,
} from 'antd';
import 'antd/dist/antd.css';
import './style/style.css';
import './style/buttonStyle.css';
import './style/statCardStyle.css';
import './style/tabStyle.css';
import './style/checkboxStyle.css';
import './style/radioStyle.css';
import './style/selectStyle.css';
import './style/inputStyle.css';
import './style/modalStyle.css';

const App = () => (
  <>
    <h1>UNDP Data Future Platform Template</h1>
    <div style={{
      display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '2rem',
    }}
    >
      <button type='button' className='undp-button button-primary button-arrow'>Read More</button>
      <button type='button' className='undp-button button-secondary button-arrow'>Read More</button>
      <button type='button' className='undp-button button-primary disabled button-arrow'>Read More</button>
      <button type='button' className='undp-button button-tertiary button-arrow'>Read More</button>
      <button type='button' className='undp-button button-tertiary disabled button-arrow'>Read More</button>
    </div>
    <div>
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
      <h5>Heading 5</h5>
      <h6>Heading 6</h6>
    </div>
    <div style={{ width: '25%' }}>
      <div className='stat-card'>
        <h2>832</h2>
        <h4>Million</h4>
        <p>Lorem Ipsum dolor sit Amet</p>
      </div>
    </div>
    <a href='www.google.com'>Hello World</a>

    <Select
      className='undp-select'
      style={{ width: '30%' }}
      allowClear
      mode='multiple'
      showSearch
      placeholder='Select All'
      dropdownMatchSelectWidth
      clearIcon={<div className='clearIcon' />}
    >
      <Select.Option className='undp-select-option' value='jack'>Jack</Select.Option>
      <Select.Option className='undp-select-option' value='lucy'>Lucy</Select.Option>
      <Select.Option className='undp-select-option' value='disabled' disabled>
        Disabled
      </Select.Option>
      <Select.Option className='undp-select-option' value='Yiminghe'>yiminghe</Select.Option>
    </Select>

    <Tabs
      defaultActiveKey='1'
      className='undp-tabs'
    >
      <Tabs.TabPane className='undp-tab-content' tab='Tab 1' key='1'>
        Content of Tab Pane 1
      </Tabs.TabPane>
      <Tabs.TabPane className='undp-tab-content' tab='Tab 2' key='2'>
        Content of Tab Pane 2
      </Tabs.TabPane>
      <Tabs.TabPane className='undp-tab-content' tab='Tab 3' key='3'>
        Content of Tab Pane 3
      </Tabs.TabPane>
    </Tabs>

    <Checkbox className='undp-checkbox' checked>Checkbox Check</Checkbox>
    <Checkbox className='undp-checkbox' checked={false}>Checkbox Unchecked</Checkbox>
    <Checkbox className='undp-checkbox' disabled>Checkbox Unchecked</Checkbox>
    <Radio.Group value={1}>
      <Radio className='undp-radio' value={1}>A</Radio>
      <Radio className='undp-radio' value={2}>B</Radio>
      <Radio className='undp-radio' value={3}>C</Radio>
      <Radio className='undp-radio' disabled value={4}>D</Radio>
    </Radio.Group>
    <Input style={{ width: '30%', margin: '2rem' }} className='undp-input' placeholder='Basic usage' />
    <div style={{ height: '100px', width: '100px', overflow: 'auto' }} className='undp-scrollbar'>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lobortis purus velit, non tempus dolor semper in. Vestibulum efficitur ullamcorper odio, quis dictum enim faucibus et. Fusce eget leo non nisi euismod ultrices sed ac leo. Fusce dictum mi nec eros vulputate, in pellentesque mauris pharetra. Duis mattis nec nulla in vestibulum. In volutpat augue et arcu facilisis varius et id diam. Cras auctor lobortis urna, et rhoncus nisl consectetur blandit. Nulla facilisi. Duis nisi erat, euismod vestibulum varius a, accumsan et mi. Vivamus sit amet metus orci.
      Aenean mauris elit, laoreet a auctor non, sodales vel neque. Nullam eleifend, nibh ut dictum egestas, odio leo fermentum ex, vitae congue nisl massa at mi. Etiam eu lectus tincidunt, aliquet tellus et, consectetur augue. Nam fermentum malesuada efficitur. Etiam eu lorem odio. Duis lobortis tortor et vulputate tincidunt. Praesent pulvinar tempor nulla non malesuada. Sed molestie leo nisl. Nunc rutrum tempor consectetur. Fusce eleifend nisi in rhoncus lobortis. Maecenas tellus sapien, sodales sed euismod eget, fermentum eget mi. Nulla facilisi. Aliquam a nisl neque. Cras diam orci, semper ut orci et, lobortis mollis nunc.
    </div>
  </>
);

export default App;
