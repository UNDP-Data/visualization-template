import styled from 'styled-components';
import { useState } from 'react';
import Select from 'react-dropdown-select';
import { OptionsDataType } from '../Types';
import { HelpIcon } from '../Icons';
import { Tooltip } from './Tooltip';

interface Props {
  title: string;
  options: OptionsDataType[];
  disabled: boolean;
  onChange:any;
  value: any;
  helpIconDisabled: boolean;
  bodyForTooltip: string;
  labelField: string;
  valueField: string;
}

const DropdownContainer = styled.div`
  margin: 1rem 0.5rem; 
`;

const DropdownEl = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
`;

interface SettingTitleProps {
  disabled: boolean;
}

const SettingTitle = styled.div<SettingTitleProps>`
  font-size: 1.2rem;
  line-height: 2.56rem;
  color:var(--navy);
  margin: 0.5rem 0 0.3rem 0;
  opacity:${(props) => (props.disabled ? 0.2 : 1)};
`;

export const DropdownUnit = (props: Props) => {
  const {
    title,
    options,
    onChange,
    disabled,
    value,
    helpIconDisabled,
    bodyForTooltip,
    labelField,
    valueField,
  } = props;
  const [showPopUpForTitle, setShowPopUpForTitle] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  return (
    <>
      <DropdownContainer>
        <DropdownEl>
          <SettingTitle disabled={disabled}>
            {title}
          </SettingTitle>
          <div onMouseEnter={() => { setShowPopUpForTitle(true); }} onMouseLeave={() => { setShowPopUpForTitle(false); }}>
            <HelpIcon size={20} opacity={disabled ? 0.2 : 1} fill='#110848' />
          </div>
        </DropdownEl>
        {
        showPopUpForTitle
          ? (
            <Tooltip
              body={bodyForTooltip}
            />
          ) : null
      }
        <DropdownEl>
          <Select
            options={options}
            className='dropdownMain'
            onChange={(el: any) => { onChange(el); }}
            values={value}
            labelField={labelField}
            valueField={valueField}
            dropdownHeight='250px'
            dropdownPosition='auto'
            searchable={false}
            dropdownGap={2}
            disabled={disabled}
          />
          <div onMouseEnter={() => { setShowPopUp(true); }} onMouseLeave={() => { setShowPopUp(false); }}>
            <HelpIcon size={24} opacity={helpIconDisabled ? 0.2 : 1} fill='#110848' />
          </div>
        </DropdownEl>
        {
      !helpIconDisabled && !disabled && showPopUp
        ? (
          <Tooltip
            title={value[0].Indicator}
            body={value[0]['Indicator Description']}
            sourceName={value[0]['Data source name']}
            sourceLink={value[0]['Data source link']}
            date={value[0].Year ? value[0].Year.slice(-4) : null}
          />
        ) : null
    }
      </DropdownContainer>
    </>
  );
};
