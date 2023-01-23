import { Segmented } from 'antd';

export const SegmentedEl = () => (
  <div className='flex-wrap margin-bottom-09'>
    <div className='margin-bottom-07'>
      <p className='label'>Segmented Selection Large</p>
      <Segmented className='undp-segmented' options={['Daily', { label: 'Weekly', value: 'Weekly', disabled: true }, 'Monthly', 'Quarterly', 'Yearly']} onResize={undefined} onResizeCapture={undefined} />
    </div>
    <hr />
    <div className='margin-top-07 margin-bottom-09'>
      <p className='label'>Segmented Selection Small</p>
      <Segmented className='undp-segmented-small' options={['Daily', { label: 'Weekly', value: 'Weekly', disabled: true }, 'Monthly', 'Quarterly', 'Yearly']} onResize={undefined} onResizeCapture={undefined} />
    </div>
  </div>
);
