import { Switch } from 'antd';

export const SwitchEl = () => (
  <div className='flex-wrap margin-bottom-07'>
    <div className='margin-bottom-07'>
      <p className='label'>Switch label</p>
      <Switch className='undp-switch' />
    </div>
    <div className='margin-bottom-07'>
      <p className='label'>Switch disabled</p>
      <Switch disabled className='undp-switch' />
    </div>
  </div>
);
