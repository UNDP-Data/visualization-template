import { Input } from 'antd';
import '../style/inputStyle.css';

export const InputField = () => (
  <div className='flex-wrap margin-bottom-07'>
    <p className='label'>Input Field Label</p>
    <Input className='undp-input' placeholder='Placeholder Text' />
  </div>
);
