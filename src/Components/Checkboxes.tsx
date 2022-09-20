import { Checkbox } from 'antd';
import '../style/checkboxStyle.css';

export const Checkboxes = () => (
  <div className='flex-wrap margin-bottom-07'>
    <p className='label'>Checkbox Label</p>
    <Checkbox className='undp-checkbox' checked>Checkbox Check</Checkbox>
    <Checkbox className='undp-checkbox'>Checkbox Unchecked</Checkbox>
    <Checkbox className='undp-checkbox' disabled>Checkbox Unchecked</Checkbox>
  </div>
);
