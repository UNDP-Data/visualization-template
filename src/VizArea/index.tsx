import { useState } from 'react';
import styled from 'styled-components';
import { DataType, IndicatorOptionsDataType, OptionsDataType } from '../Types';
import {
  ScatterPlotIcon, BarGraphIcon, MapIcon,
} from '../Icons';
import { DropdownUnit } from '../Components/DropdownUnit';
import { MultiSelectDropdownUnit } from '../Components/MultiSelectDropdownUnit';
import { ScatterPlot } from '../ScatterPlot';
import { BarGraph } from '../BarChart';
import { Map } from '../Map';
import { getRange } from '../Utils/getRange';
import { DEFAULT_VALUES, INCOME_GROUPS } from '../Constants';

interface Props {
  data: DataType[];
  indicators: IndicatorOptionsDataType[];
  regions: string[];
  countries: string[];
}

const Container = styled.div`
  max-width: 1220px;
`;

const VizSettingsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const DropdownContainer = styled.div`
  margin: 1rem 0.5rem; 
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
  background-color: ${(props) => (props.selected ? 'var(--dropdown-bg)' : 'var(--white)')};
  font-size: 1.4rem;
  color: var(--navy);
  padding: 0.5rem 2.4rem;
  margin: 0.2rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 4.8rem;
  opacity: ${(props) => (props.selected ? 1 : 0.25)};
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
    regions,
    countries,
  } = props;
  const countryGroups = ['All', 'LDC', 'LLDC', 'SIDS'];
  const colorSelectOptions: OptionsDataType[] = [
    {
      Indicator: 'Not Selected',
      'Data source link': null,
      'Data source name': null,
      'Time period': null,
      'Indicator Description': null,
      Year: null,
      Label: 'Not Selected',
      Categorical: false,
      disabled: false,
    },
    {
      Indicator: 'Continents',
      'Data source link': null,
      'Data source name': null,
      'Time period': null,
      'Indicator Description': null,
      Year: null,
      Label: 'Continent',
      disabled: false,
      Categorical: true,
    },
    {
      Indicator: 'Income group',
      'Data source link': null,
      'Data source name': null,
      'Time period': null,
      'Indicator Description': null,
      Year: null,
      Label: 'Income group',
      disabled: false,
      Categorical: true,
    },
  ];
  const areaSelectOptions: OptionsDataType[] = [
    {
      Indicator: 'Not Selected',
      'Data source link': null,
      'Data source name': null,
      'Time period': null,
      'Indicator Description': null,
      Year: null,
      Label: 'Not Selected',
      disabled: false,
      Categorical: false,
    },
  ];
  const secondMetricSelectOptionsForMap: OptionsDataType[] = [
    {
      Indicator: 'Not Selected',
      'Data source link': null,
      'Data source name': null,
      'Time period': null,
      'Indicator Description': null,
      Year: null,
      Label: 'Not Selected',
      disabled: false,
      Categorical: false,
    },
  ];
  indicators.forEach((d) => {
    if (d.Categorical) {
      colorSelectOptions.push({
        Indicator: d.Indicator,
        'Data source link': d['Data source link'],
        'Data source name': d['Data source name'],
        'Time period': d['Time period'],
        'Indicator Description': d['Indicator Description'],
        Year: d.Year,
        Label: d.Indicator === 'Deaths, cumulative' || d.Indicator === 'Confirmed cases, cumulative' ? `COVID-19 ${d.Indicator}` : d.Indicator,
        disabled: !!(d.Indicator === 'Deaths, cumulative' || d.Indicator === 'Confirmed cases, cumulative'),
        Categorical: d.Categorical,
      });
    }
    secondMetricSelectOptionsForMap.push({
      Indicator: d.Indicator,
      'Data source link': d['Data source link'],
      'Data source name': d['Data source name'],
      'Time period': d['Time period'],
      'Indicator Description': d['Indicator Description'],
      Year: d.Year,
      Label: d.Indicator === 'Deaths, cumulative' || d.Indicator === 'Confirmed cases, cumulative' ? `COVID-19 ${d.Indicator}` : d.Indicator,
      disabled: !!(d.Indicator === 'Deaths, cumulative' || d.Indicator === 'Confirmed cases, cumulative'),
      Categorical: d.Categorical,
    });
  });
  indicators.forEach((d) => {
    if (!d.Categorical && getRange(data, d.Indicator)[0] >= 0) {
      areaSelectOptions.push({
        Indicator: d.Indicator,
        'Data source link': d['Data source link'],
        'Data source name': d['Data source name'],
        'Time period': d['Time period'],
        'Indicator Description': d['Indicator Description'],
        Year: d.Year,
        Label: d.Indicator === 'Deaths, cumulative' || d.Indicator === 'Confirmed cases, cumulative' ? `COVID-19 ${d.Indicator}` : d.Indicator,
        disabled: !!(d.Indicator === 'Deaths, cumulative' || d.Indicator === 'Confirmed cases, cumulative'),
        Categorical: d.Categorical,
      });
    }
  });
  const indicatorsSelectOptionsWithCategorical: OptionsDataType[] = indicators.map((d) => ({
    Indicator: d.Indicator,
    'Data source link': d['Data source link'],
    'Data source name': d['Data source name'],
    'Time period': d['Time period'],
    'Indicator Description': d['Indicator Description'],
    Year: d.Year,
    Label: d.Indicator === 'Deaths, cumulative' || d.Indicator === 'Confirmed cases, cumulative' ? `COVID-19 ${d.Indicator}` : d.Indicator,
    disabled: !!(d.Indicator === 'Deaths, cumulative' || d.Indicator === 'Confirmed cases, cumulative'),
    Categorical: d.Categorical,
  }));
  const indicatorsSelectOptionsWOCategorical: OptionsDataType[] = indicators.filter((d) => !d.Categorical).map((d) => ({
    Indicator: d.Indicator,
    'Data source link': d['Data source link'],
    'Data source name': d['Data source name'],
    'Time period': d['Time period'],
    'Indicator Description': d['Indicator Description'],
    Label: d.Indicator === 'Deaths, cumulative' || d.Indicator === 'Confirmed cases, cumulative' ? `COVID-19 ${d.Indicator}` : d.Indicator,
    disabled: !!(d.Indicator === 'Deaths, cumulative' || d.Indicator === 'Confirmed cases, cumulative'),
    Year: d.Year,
    Categorical: d.Categorical,
  }));
  const [firstMetric, setFirstMetric] = useState(indicatorsSelectOptionsWOCategorical[indicatorsSelectOptionsWOCategorical.findIndex((d) => d.Indicator === DEFAULT_VALUES.firstMetric)]);
  const [secondMetric, setSecondMetric] = useState(indicatorsSelectOptionsWOCategorical[indicatorsSelectOptionsWOCategorical.findIndex((d) => d.Indicator === DEFAULT_VALUES.secondMetric)]);
  const [optionForFirstDropDown, setOptionForFirstDropdown] = useState(indicatorsSelectOptionsWOCategorical);
  const [optionForSecondDropDown, setOptionForSecondDropdown] = useState(indicatorsSelectOptionsWOCategorical);
  const [colorMetric, setColorMetric] = useState(colorSelectOptions[colorSelectOptions.findIndex((d) => d.Indicator === DEFAULT_VALUES.colorMetric)]);
  const [sizeMetric, setSizeMetric] = useState(areaSelectOptions[0]);
  const [selectedVizType, setSelectedVizType] = useState<'scatterPlot' | 'map' | 'barGraph'>('scatterPlot');
  const [selectedCountryGroup, setSelectedCountryGroup] = useState<'All' | 'LDC' | 'LLDC' | 'SIDS'>('All');
  const [selectedRegion, setSelectedRegion] = useState<string[]>([]);
  const [selectedIncomeGroups, setSelectedIncomeGroups] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  return (
    <Container>
      <Header>
        <h3>Explore Data</h3>
        <DropdownContainer>
          <ToggleEl>
            <ToggleOption
              selected={selectedVizType === 'scatterPlot'}
              onClick={() => {
                if (indicatorsSelectOptionsWOCategorical.findIndex((d) => d.Indicator === firstMetric.Indicator) === -1) setFirstMetric(indicatorsSelectOptionsWOCategorical[0]);
                if (indicatorsSelectOptionsWOCategorical.findIndex((d) => d.Indicator === secondMetric.Indicator) === -1) setSecondMetric(indicatorsSelectOptionsWOCategorical[1]);
                setSelectedVizType('scatterPlot');
                setOptionForFirstDropdown(indicatorsSelectOptionsWOCategorical);
                setOptionForSecondDropdown(indicatorsSelectOptionsWOCategorical);
              }}
            >
              <ScatterPlotIcon size={24} fill='#110848' />
              <div>ScatterPlot</div>
            </ToggleOption>
            <ToggleOption
              selected={selectedVizType === 'map'}
              onClick={() => {
                setSelectedVizType('map');
                setOptionForFirstDropdown(indicatorsSelectOptionsWithCategorical);
                setOptionForSecondDropdown(secondMetricSelectOptionsForMap);
              }}
            >
              <MapIcon size={24} fill='#110848' />
              <div>Map</div>
            </ToggleOption>
            <ToggleOption
              selected={selectedVizType === 'barGraph'}
              onClick={() => {
                setSelectedVizType('barGraph');
                if (indicatorsSelectOptionsWOCategorical.findIndex((d) => d.Indicator === firstMetric.Indicator) === -1) setFirstMetric(indicatorsSelectOptionsWOCategorical[0]);
                if (indicatorsSelectOptionsWOCategorical.findIndex((d) => d.Indicator === secondMetric.Indicator) === -1) setSecondMetric(indicatorsSelectOptionsWOCategorical[1]);
                setOptionForFirstDropdown(indicatorsSelectOptionsWOCategorical);
                setOptionForSecondDropdown(indicatorsSelectOptionsWOCategorical);
              }}
            >
              <BarGraphIcon size={24} fill='#110848' />
              <div>Bar Chart</div>
            </ToggleOption>
          </ToggleEl>
        </DropdownContainer>
      </Header>
      <VizSettingsRow>
        <DropdownUnit
          title='Select First Metric'
          disabled={false}
          options={optionForFirstDropDown}
          onChange={(value: any) => { setFirstMetric(value[0]); }}
          value={[firstMetric]}
          helpIconDisabled={false}
          bodyForTooltip={
            selectedVizType !== 'map'
              ? 'The option only includes continuous data and is ploted on the x-axis.'
              : 'This is represnted by the colors. If second parameter is selected the values are quantized in 5 quantiles and colored according you the quantile they lie in the x-axis of the color grid.'
            }
          labelField='Label'
          valueField='Indicator'
        />
        <DropdownUnit
          title='Select Second Metric'
          disabled={selectedVizType === 'barGraph'}
          options={optionForSecondDropDown}
          onChange={(value: any) => { setSecondMetric(value[0]); }}
          value={[secondMetric]}
          helpIconDisabled={selectedVizType === 'barGraph' || secondMetric['Indicator Description'] === null}
          bodyForTooltip={
            selectedVizType !== 'map'
              ? 'The option only includes continuous data and is ploted on the y-axis. This option is not active for bar graph view.'
              : 'This is represnted by the colors. The values are quantized in 5 quantiles and colored according you the quantile they lie in the y-axis of the color grid.'
          }
          labelField='Label'
          valueField='Indicator'
        />
        <DropdownUnit
          title='Color By'
          disabled={selectedVizType === 'map'}
          options={colorSelectOptions}
          onChange={(value: any) => { setColorMetric(value[0]); }}
          value={[colorMetric]}
          helpIconDisabled={selectedVizType === 'map' || secondMetric['Indicator Description'] === null}
          bodyForTooltip='The option only includes discreet data and is represented as color of the bars or circle. This option is not active for the map view.'
          labelField='Label'
          valueField='Indicator'
        />
        <DropdownUnit
          title='Size By'
          disabled={selectedVizType === 'barGraph'}
          options={areaSelectOptions}
          onChange={(value: any) => { setSizeMetric(value[0]); }}
          value={[sizeMetric]}
          helpIconDisabled={selectedVizType === 'barGraph' || sizeMetric['Indicator Description'] === null}
          bodyForTooltip='The option only includes continuous data with minimum value greater than or equal to 0 and is represented by the size of the circle. This option is not active for the bar graph view.'
          labelField='Label'
          valueField='Indicator'
        />
      </VizSettingsRow>
      <VizSettingsRow>
        <MultiSelectDropdownUnit
          title='Filter By Region'
          options={regions.map((d) => ({
            label: d,
          }))}
          disabled={false}
          onChange={(value: any) => { setSelectedRegion(value); }}
          value={selectedRegion.map((d) => ({
            label: d,
          }))}
          placeholder='Select regions to filter by'
        />
        <DropdownContainer>
          <SettingTitle disabled={false}>
            Filter By Country Groups
          </SettingTitle>
          <ToggleEl>
            {countryGroups.map((d, i) => (
              <ToggleOption
                key={i}
                selected={selectedCountryGroup === d}
                onClick={() => { setSelectedCountryGroup(d as 'All'|'LDC'|'LLDC'|'SIDS'); }}
              >
                {d}
              </ToggleOption>
            ))}
          </ToggleEl>
        </DropdownContainer>
        <MultiSelectDropdownUnit
          title='Filter By Income Groups'
          options={INCOME_GROUPS.map((d) => ({
            label: d,
          }))}
          disabled={false}
          onChange={(value: any) => { setSelectedIncomeGroups(value); }}
          value={selectedIncomeGroups.map((d) => ({
            label: d,
          }))}
          placeholder='Select income groups to filter by'
        />
        <MultiSelectDropdownUnit
          title='Search and Highlight by Country'
          dropdownClass='countrySelect'
          options={countries.map((d) => ({
            label: d,
          }))}
          disabled={false}
          onChange={(value: any) => { setSelectedCountries(value); }}
          value={selectedCountries.map((d) => ({
            label: d,
          }))}
          placeholder='Select countries to highlight'
        />
      </VizSettingsRow>
      {
        selectedVizType === 'scatterPlot'
          ? (
            <ScatterPlot
              data={data}
              firstMetric={firstMetric}
              secondMetric={secondMetric}
              colorMetric={colorMetric}
              sizeMetric={sizeMetric}
              selectedCountryGroup={selectedCountryGroup}
              selectedRegion={selectedRegion}
              selectedCountries={selectedCountries}
              selectedIncomeGroups={selectedIncomeGroups}
            />
          ) : selectedVizType === 'barGraph'
            ? (
              <BarGraph
                data={data}
                firstMetric={firstMetric}
                colorMetric={colorMetric}
                selectedCountryGroup={selectedCountryGroup}
                selectedRegion={selectedRegion}
                selectedCountries={selectedCountries}
                selectedIncomeGroups={selectedIncomeGroups}
              />
            ) : (
              <Map
                data={data}
                firstMetric={firstMetric}
                secondMetric={secondMetric}
                selectedCountryGroup={selectedCountryGroup}
                selectedRegion={selectedRegion}
                sizeMetric={sizeMetric}
                selectedCountries={selectedCountries}
                selectedIncomeGroups={selectedIncomeGroups}
              />
            )
}
    </Container>
  );
};
