import { Radio } from 'antd';
import '../style/radioStyle.css';

export const RadioEl = () => (
  <div className='flex-wrap margin-bottom-07'>
    <p className='label'>Radio Group Label</p>
    <Radio.Group defaultValue={1}>
      <Radio className='undp-radio' value={1}>Option 1</Radio>
      <Radio className='undp-radio' value={2}>Option 2</Radio>
      <Radio className='undp-radio' value={3}>Option 3</Radio>
      <Radio className='undp-radio' disabled value={4}>Option 4</Radio>
    </Radio.Group>
  </div>
);
