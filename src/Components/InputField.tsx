import { DatePicker, Input, InputNumber } from 'antd';
import '../style/inputStyle.css';

export const InputField = () => (
  <div className='flex-wrap margin-bottom-07'>
    <div className='margin-bottom-09'>
      <p className='label'>Input Field Label</p>
      <Input className='undp-input' placeholder='Placeholder Text' />
    </div>
    <hr />
    <div className='margin-top-07 margin-bottom-09'>
      <p className='label'>Text Area</p>
      <Input.TextArea className='undp-text-area' rows={4} placeholder='Placeholder Text' />
    </div>
    <hr />
    <div className='margin-top-07 margin-bottom-09'>
      <p className='label'>Password Area</p>
      <Input.Password className='undp-input' placeholder='Password Text' />
    </div>
    <hr />
    <div className='margin-top-07 margin-bottom-09'>
      <p className='label'>Number Input Field</p>
      <InputNumber className='undp-input' />
    </div>
    <hr />
    <div className='margin-top-07 margin-bottom-09'>
      <p className='label'>Date Picker</p>
      <DatePicker className='undp-input' />
    </div>
  </div>
);
