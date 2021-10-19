import styled from 'styled-components';
import Select from 'react-dropdown-select';

interface Props {
  title: string;
  options: any;
  disabled: boolean;
  onChange:any;
  value: any;
  placeholder: string,
  addPlaceholder?: string;
  dropdownClass?: string;
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

export const MultiSelectDropdownUnit = (props: Props) => {
  const {
    title,
    options,
    onChange,
    disabled,
    value,
    dropdownClass,
    placeholder,
    addPlaceholder,
  } = props;
  return (
    <>
      <DropdownContainer>
        <DropdownEl>
          <SettingTitle disabled={disabled}>
            {title}
          </SettingTitle>
        </DropdownEl>
        <DropdownEl>
          <Select
            options={options}
            className={`dropdownMulti ${dropdownClass || null}`}
            onChange={(el: any) => { onChange(el.map((r: { label: any; }) => r.label)); }}
            labelField='label'
            valueField='label'
            dropdownHeight='250px'
            dropdownPosition='auto'
            searchable
            dropdownGap={2}
            placeholder={placeholder}
            addPlaceholder={value.length > 2 && addPlaceholder ? `+${value.length - 2} ${addPlaceholder}` : undefined}
            multi
            values={value}
          />
        </DropdownEl>
      </DropdownContainer>
    </>
  );
};
