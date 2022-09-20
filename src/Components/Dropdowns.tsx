import { Select } from 'antd';
import '../style/selectStyle.css';

export const Dropdowns = () => (
  <div className='flex-wrap margin-bottom-07'>
    <div className='margin-bottom-07'>
      <h6>With Label No Search No Mutiple Select No Clear</h6>
      <div className='margin-top-07'>
        <p className='label'>Dropdown Label</p>
        <Select
          className='undp-select'
          placeholder='Select All'
        >
          <Select.Option className='undp-select-option' value='jack'>Jack</Select.Option>
          <Select.Option className='undp-select-option' value='lucy'>Lucy</Select.Option>
          <Select.Option className='undp-select-option' value='disabled' disabled>
            Disabled
          </Select.Option>
          <Select.Option className='undp-select-option' value='Yiminghe'>yiminghe</Select.Option>
        </Select>
      </div>
    </div>
    <hr />
    <div className='margin-top-07 margin-bottom-07'>
      <h6>With Label Search Mutiple Select Allow Clear</h6>
      <div className='margin-top-07'>
        <p className='label'>Dropdown Label</p>
        <Select
          className='undp-select'
          placeholder='Select All'
          style={{ width: '30%' }}
          allowClear
          mode='multiple'
          showSearch
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
      </div>
    </div>
    <hr />
    <div className='margin-top-07 margin-bottom-07'>
      <h6>Language Select</h6>
      <div className='margin-top-07'>
        <Select
          className='undp-select undp-language-select'
          defaultValue='English'
        >
          <Select.Option className='undp-select-option' value='English'>English</Select.Option>
          <Select.Option className='undp-select-option' value='French'>French</Select.Option>
          <Select.Option className='undp-select-option' value='Chinese'>Chinese</Select.Option>
        </Select>
      </div>
    </div>
  </div>
);
