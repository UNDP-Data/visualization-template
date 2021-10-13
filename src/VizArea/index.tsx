import React, { useState } from 'react';
import styled from 'styled-components';
import Select from 'react-dropdown-select';
import { DataType, IndicatorOptionsDataType, OptionsDataType } from '../Types';
import { HelpIcon, ScatterPlotIcon, BarGraphIcon, MapIcon, Tick } from '../Icons';
import { Tooltip } from '../Components/Tooltip';
import { ScatterPlot } from '../ScatterPlot';
import { BarGraph } from '../BarChart';
import  { Map } from '../Map';
import { getRange } from '../Utils/getRange';

interface Props {
	data: DataType[];
	indicators: IndicatorOptionsDataType[];
	regions: string[];
}

const Container = styled.div`
	max-width: 1280px;
	padding: 0 1rem;
`;

const VizSettingsRow = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

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
	margin-bottom: 0.3rem;
	color:var(--navy);
	opacity:${props => props.disabled ? 0.2 : 1};
`;

const ToggleEl = styled.div`
	display: flex;
  background-color: var(--white);
	border-radius: 3rem;
  border: 2px solid var(--dropdown-bg);
`;

interface ToggleOptionProps {
	selected: boolean;
}

const ToggleOption = styled.div<ToggleOptionProps>`
	background-color: ${props => props.selected ? 'var(--dropdown-bg)' : 'var(--white)' };
	font-size: 1.4rem;
	color: var(--navy);
	padding: 0.5rem 2.4rem;
  margin: 0.2rem;
	font-weight: 600;
	cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 4.8rem;
  opacity: ${props => props.selected ? 1 : 0.25 };
`;

const CheckboxContainer = styled.div`
	display: flex;
`;

const CheckboxEl = styled.div`
	display: flex;
	margin: 0.8rem 1rem;
	align-items: center;
  cursor: pointer;
`;

interface CheckboxDataType {
	selected: boolean;
}

const Checkbox = styled.div<CheckboxDataType>`
	width: 1.4rem;
	height: 1.4rem;
	border: 2px solid ${props => props.selected ? 'var(--navy)': 'var(--grey-c3)'};
  border-radius: 0.2rem;
	margin-right: 1rem;
	background-color: ${props => props.selected ? 'var(--navy)': 'var(--white)'};
	&:hover {
		border: 2px solid var(--navy);
	};
`;

const CheckboxValue = styled.div`
	font-size: 1.2rem;
	font-weight: 400;
	margin-top: 0.2rem;
  text-transform: uppercase;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;


export const VizArea = (props: Props) => {
  const {
    data,
    indicators,
    regions
  } = props;
  const countryGroups = ['All','LDC','LLDC','SIDS'];
  const colorSelectOptions: OptionsDataType[] = [
    {
      Indicator: 'Not Selected',
      'Data source link': null,
      'Data source name': null,
      'Time period': null,
      'Indicator Description': null,
      'Year': null,
      Categorical: false,
    },
    {
      Indicator: 'Continents',
      'Data source link': null,
      'Data source name': null,
      'Time period': null,
      'Indicator Description': null,
      'Year': null,
      Categorical: true,
    }
  ];
  const areaSelectOptions: OptionsDataType[] = [
    {
      Indicator: 'Not Selected',
      'Data source link': null,
      'Data source name': null,
      'Time period': null,
      'Indicator Description': null,
      Year: null,
      Categorical: false,
    }
  ];
  const secondMetricSelectOptionsForMap: OptionsDataType[] = [
    {
      Indicator: 'Not Selected',
      'Data source link': null,
      'Data source name': null,
      'Time period': null,
      'Indicator Description': null,
      Year: null,
      Categorical: false,
    }
  ];
  indicators.forEach(d => {
    colorSelectOptions.push({
      Indicator: d.Indicator,
      'Data source link': d['Data source link'],
      'Data source name': d['Data source name'],
      'Time period': d['Time period'],
      'Indicator Description': d['Indicator Description'],
      Year: d.Year,
      Categorical: d.Categorical,
    });
    secondMetricSelectOptionsForMap.push({
      Indicator: d.Indicator,
      'Data source link': d['Data source link'],
      'Data source name': d['Data source name'],
      'Time period': d['Time period'],
      'Indicator Description': d['Indicator Description'],
      Year: d.Year,
      Categorical: d.Categorical,
    });
  });
  indicators.forEach(d => {
    if(!d.Categorical && getRange(data,d.Indicator)[0] >= 0)
      areaSelectOptions.push({
        Indicator: d.Indicator,
        'Data source link': d['Data source link'],
        'Data source name': d['Data source name'],
        'Time period': d['Time period'],
        'Indicator Description': d['Indicator Description'],
        Year: d.Year,
        Categorical: d.Categorical,
      });
  });
  const indicatorsSelectOptionsWithCategorical: OptionsDataType[] = indicators.map(d => {
    return {
      Indicator: d.Indicator,
      'Data source link': d['Data source link'],
      'Data source name': d['Data source name'],
      'Time period': d['Time period'],
      'Indicator Description': d['Indicator Description'],
      'Year': d['Year'],
      Categorical: d.Categorical,
    };
  });
  const indicatorsSelectOptionsWOCategorical: OptionsDataType[] = indicators.filter(d => !d.Categorical).map(d => {
    return {
      Indicator: d.Indicator,
      'Data source link': d['Data source link'],
      'Data source name': d['Data source name'],
      'Time period': d['Time period'],
      'Indicator Description': d['Indicator Description'],
      'Year': d['Year'],
      Categorical: d.Categorical,
    };
  });
  const [firstMetric, setFirstMetric] = useState(indicatorsSelectOptionsWOCategorical[0]);
  const [secondMetric, setSecondMetric] = useState(indicatorsSelectOptionsWOCategorical[1]);
  const [optionForFirstDropDown, setOptionForFirstDropdown] = useState(indicatorsSelectOptionsWOCategorical);
  const [optionForSecondDropDown, setOptionForSecondDropdown] = useState(indicatorsSelectOptionsWOCategorical);
  const [colorMetric, setColorMetric] = useState(colorSelectOptions[1]);
  const [sizeMetric, setSizeMetric] = useState(areaSelectOptions[0]);
  const [selectedVizType, setSelectedVizType] = useState<'scatterPlot' | 'map' | 'barGraph'>('scatterPlot');
  const [selectedCountryGroup, setSelectedCountryGroup] = useState<'All' | 'LDC' | 'LLDC' | 'SIDS'>('All');
  const [selectedRegion, setSelectedRegion] = useState<string[]>(regions);
  const [helpIconHover, setHelpIconHover] = useState<string | null>(null);

  return (
    <Container>
      <Header>
        <h3>Explore Data</h3>
        <DropdownContainer>
          <ToggleEl>
            <ToggleOption 
              selected={selectedVizType === 'scatterPlot' ? true : false}
              onClick={() => {
                if(indicatorsSelectOptionsWOCategorical.findIndex(d => d.Indicator === firstMetric.Indicator) === -1) setFirstMetric(indicatorsSelectOptionsWOCategorical[0]);
                if(indicatorsSelectOptionsWOCategorical.findIndex(d => d.Indicator === secondMetric.Indicator) === -1) setSecondMetric(indicatorsSelectOptionsWOCategorical[1]);
                setSelectedVizType('scatterPlot');
                setOptionForFirstDropdown(indicatorsSelectOptionsWOCategorical);
                setOptionForSecondDropdown(indicatorsSelectOptionsWOCategorical);
              }}
            >
              <ScatterPlotIcon size={24} fill={'#110848'} />
              <div>ScatterPlot</div>
            </ToggleOption>
            <ToggleOption 
              selected={selectedVizType === 'map' ? true : false}
              onClick={() => {
                setSelectedVizType('map');
                setOptionForFirstDropdown(indicatorsSelectOptionsWithCategorical);
                setOptionForSecondDropdown(secondMetricSelectOptionsForMap);
              }}
            >
              <MapIcon size={24} fill={'#110848'} />
              <div>Map</div>
            </ToggleOption>
            <ToggleOption 
              selected={selectedVizType === 'barGraph' ? true : false}
              onClick={() => {
                setSelectedVizType('barGraph');
                if(indicatorsSelectOptionsWOCategorical.findIndex(d => d.Indicator === firstMetric.Indicator) === -1) setFirstMetric(indicatorsSelectOptionsWOCategorical[0]);
                if(indicatorsSelectOptionsWOCategorical.findIndex(d => d.Indicator === secondMetric.Indicator) === -1) setSecondMetric(indicatorsSelectOptionsWOCategorical[1]);
                setOptionForFirstDropdown(indicatorsSelectOptionsWOCategorical);
                setOptionForSecondDropdown(indicatorsSelectOptionsWOCategorical);
              }}
            >
              <BarGraphIcon size={24} fill={ '#110848'}/>
              <div>Bar Chart</div>
            </ToggleOption>
          </ToggleEl>
        </DropdownContainer>
      </Header>
      <VizSettingsRow>
        <DropdownContainer>
          <SettingTitle disabled={false}>
						Select First Metric
          </SettingTitle>
          <DropdownEl>
            <Select
              options={optionForFirstDropDown}
              labelField={'Indicator'}
              valueField={'Indicator'}
              onChange={(value: any) => { setFirstMetric(value[0]); }}
              values={[firstMetric]}
              dropdownHeight="250px"
              dropdownPosition="auto"
              searchable={false}
              dropdownGap={2}
            />
            <div onMouseEnter={() => {setHelpIconHover('firstMetric');}} onMouseLeave={() => {setHelpIconHover(null);}}>
              <HelpIcon size={24} fill={'#110848'} />
            </div>
          </DropdownEl>
          {
            helpIconHover === 'firstMetric' && firstMetric['Indicator Description'] !== null ? 
              <Tooltip 
                title={firstMetric.Indicator}
                body={firstMetric['Indicator Description']}
                sourceName={firstMetric['Data source name']}
                sourceLink={firstMetric['Data source link']}
                date={firstMetric.Year ? firstMetric.Year.slice(-4): null}
              /> : null
          }
        </DropdownContainer>
        <DropdownContainer>
          <SettingTitle disabled={selectedVizType === 'barGraph' ? true : false}>
						Select Second Metric
          </SettingTitle>
          <DropdownEl>
            <Select
              options={optionForSecondDropDown}
              onChange={(value: any) => { setSecondMetric(value[0]); }}
              values={[secondMetric]}
              labelField={'Indicator'}
              valueField={'Indicator'}
              dropdownHeight="250px"
              dropdownPosition="auto"
              searchable={false}
              dropdownGap={2}
              disabled={selectedVizType === 'barGraph' ? true : false}
            />
            <div onMouseEnter={() => {setHelpIconHover('secondMetric');}} onMouseLeave={() => {setHelpIconHover(null);}}>
              <HelpIcon size={24} opacity={selectedVizType === 'barGraph' || secondMetric['Indicator Description'] === null ? 0.2: 1} fill={'#110848'}/>
            </div>
          </DropdownEl>
          {
            helpIconHover === 'secondMetric' && selectedVizType !== 'barGraph' && secondMetric['Indicator Description'] !== null ? 
              <Tooltip 
                title={secondMetric.Indicator}
                body={secondMetric['Indicator Description']}
                sourceName={secondMetric['Data source name']}
                sourceLink={secondMetric['Data source link']}
                date={secondMetric.Year ? secondMetric.Year.slice(-4) : null}
              /> : null
          }
        </DropdownContainer>
        <DropdownContainer>
          <SettingTitle disabled={selectedVizType === 'map' ? true : false}>
						Color By
          </SettingTitle>
          <DropdownEl>
            <Select
              options={colorSelectOptions}
              onChange={(value: any) => { setColorMetric(value[0]); }}
              values={[colorMetric]}
              labelField={'Indicator'}
              valueField={'Indicator'}
              dropdownHeight="250px"
              dropdownPosition="auto"
              searchable={false}
              dropdownGap={2}
              disabled={selectedVizType === 'map' ? true : false}
            />
            <div onMouseEnter={() => {setHelpIconHover('colorMetric');}} onMouseLeave={() => {setHelpIconHover(null);}}>
              <HelpIcon size={24} opacity={selectedVizType === 'map' || colorMetric['Indicator Description'] === null ? 0.2: 1} fill={'#110848'}/>
            </div>
          </DropdownEl>
          {
            helpIconHover === 'colorMetric' && selectedVizType !== 'map' && colorMetric['Indicator Description'] !== null ? 
              <Tooltip 
                title={colorMetric.Indicator}
                body={colorMetric['Indicator Description']}
                sourceName={colorMetric['Data source name']}
                sourceLink={colorMetric['Data source link']}
                date={colorMetric.Year ? colorMetric.Year.slice(-4) : null}
              /> : null
          }
        </DropdownContainer>
        <DropdownContainer>
          <SettingTitle disabled={selectedVizType !== 'scatterPlot' ? true : false}>
						Size By
          </SettingTitle>
          <DropdownEl>
            <Select
              options={areaSelectOptions}
              onChange={(value: any) => { setSizeMetric(value[0]); }}
              values={[sizeMetric]}
              labelField={'Indicator'}
              valueField={'Indicator'}
              dropdownHeight="250px"
              dropdownPosition="auto"
              searchable={false}
              dropdownGap={2}
              disabled={selectedVizType !== 'scatterPlot' ? true : false}
            />
            <div onMouseEnter={() => {setHelpIconHover('sizeMetric');}} onMouseLeave={() => {setHelpIconHover(null);}}>
              <HelpIcon size={24} opacity={selectedVizType !== 'scatterPlot' || sizeMetric['Indicator Description'] === null? 0.2: 1} fill={'#110848'}/>
            </div>
          </DropdownEl>
          {
            helpIconHover === 'sizeMetric' && selectedVizType === 'scatterPlot' && sizeMetric['Indicator Description'] !== null ? 
              <Tooltip 
                title={sizeMetric.Indicator}
                body={sizeMetric['Indicator Description']}
                sourceName={sizeMetric['Data source name']}
                sourceLink={sizeMetric['Data source link']}
                date={sizeMetric.Year ? sizeMetric.Year.slice(-4) : null}
              /> : null
          }
        </DropdownContainer>
      </VizSettingsRow>
      <VizSettingsRow>
        <DropdownContainer>
          <SettingTitle disabled={false}>
						Filter By Region
          </SettingTitle>
          <CheckboxContainer>
            {
              regions.map((d,i) => {
                return(
                  <CheckboxEl key ={i} onClick={() => {
                    if(selectedRegion.indexOf(d) !== -1) {
                      const regionsDuplicate = [...selectedRegion].filter(el => el !== d);
                      setSelectedRegion(regionsDuplicate);

                    } else {
                      const regionsDuplicate = [...selectedRegion, d];
                      setSelectedRegion(regionsDuplicate);
                    }
                  }}>
                    <Checkbox selected={selectedRegion.indexOf(d) !== -1 ? true : false}>
                      {
                        selectedRegion.indexOf(d) !== -1 ? <Tick size={12} fill={'#ffffff'} />: null
                      }
                    </Checkbox>
                    <CheckboxValue>{d}</CheckboxValue>
                  </CheckboxEl>
                );
              })
            }
          </CheckboxContainer>
        </DropdownContainer>
        <DropdownContainer>
          <SettingTitle disabled={false}>
						Filter By Country Groups
          </SettingTitle>
          <ToggleEl>
            {countryGroups.map((d,i) => {
              return (
                <ToggleOption 
                  key={i}
                  selected={selectedCountryGroup === d ? true : false}
                  onClick={() => {setSelectedCountryGroup(d as 'All'|'LDC'|'LLDC'|'SIDS');}}
                >
                  {d}
                </ToggleOption>);
            })}
          </ToggleEl>
        </DropdownContainer>
      </VizSettingsRow>
      {
        selectedVizType === 'scatterPlot' ? 
          <ScatterPlot 
            data={data}
            firstMetric={firstMetric}
            secondMetric={secondMetric}
            colorMetric={colorMetric}
            sizeMetric={sizeMetric}
            selectedCountryGroup={selectedCountryGroup}
            selectedRegion={selectedRegion}
          /> : selectedVizType === 'barGraph' ? 
            <BarGraph 
              data={data}
              firstMetric={firstMetric}
              colorMetric={colorMetric}
              selectedCountryGroup={selectedCountryGroup}
              selectedRegion={selectedRegion}
            />: 
            <Map 
              data={data}
              firstMetric={firstMetric}
              secondMetric={secondMetric}
              selectedCountryGroup={selectedCountryGroup}
              selectedRegion={selectedRegion}
            />
      }
    </Container>
  );
};