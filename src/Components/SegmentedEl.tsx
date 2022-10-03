import { Segmented } from 'antd';
import '../style/segmentedStyle.css';

export const SegmentedEl = () => (
  <div className='flex-wrap margin-bottom-07'>
    <div className='margin-bottom-07'>
      <p className='label'>Segmented Selection</p>
      <Segmented className='undp-segmented' options={['Daily', { label: 'Weekly', value: 'Weekly', disabled: true }, 'Monthly', 'Quarterly', 'Yearly']} />
    </div>
  </div>
);
