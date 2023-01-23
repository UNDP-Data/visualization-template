import { Slider } from 'antd';
import { SliderMarks } from 'antd/lib/slider';

const marks: SliderMarks = {
  0: '0°C',
  26: '26°C',
  37: '37°C',
  100: '100°C',
};

export const SliderEl = () => (
  <div className='flex-wrap margin-bottom-07'>
    <div className='margin-bottom-07'>
      <p className='label'>Slider With Marks And Tooltip Visible On Top</p>
      <Slider className='undp-slider' marks={marks} defaultValue={30} tooltipVisible />
    </div>
    <hr />
    <div className='margin-top-07 margin-bottom-09'>
      <p className='label'>Slider With Marks And Tooltip Visible Bottom</p>
      <Slider className='undp-slider' marks={marks} defaultValue={30} tooltipVisible tooltipPlacement='bottom' />
    </div>
    <hr />
    <div className='margin-top-07 margin-bottom-07'>
      <p className='label'>Slider Without Marks And No Tooltip</p>
      <Slider className='undp-slider' defaultValue={30} />
    </div>
    <hr />
    <div className='margin-top-07 margin-bottom-07'>
      <p className='label'>Range Slider</p>
      <Slider className='undp-slider' range defaultValue={[20, 50]} />
    </div>
    <hr />
    <div className='margin-top-07 margin-bottom-07'>
      <p className='label'>Disabled Slider</p>
      <Slider className='undp-slider' defaultValue={30} disabled />
    </div>
  </div>
);
