import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  Select, Radio, Checkbox, Button,
} from 'antd';
import 'antd/dist/antd.css';
import domtoimage from 'dom-to-image';
import { CtxDataType, IndicatorMetaDataWithYear } from '../Types';
import Context from '../Context/Context';
import { DEFAULT_VALUES, INCOME_GROUPS } from '../Constants';
import {
  ChevronDown, ChevronLeft,
} from '../Icons';

interface Props {
  indicators: IndicatorMetaDataWithYear[];
  regions: string[];
  countries: string[];
}

const El = styled.div`
  width: 25%;
  box-shadow: var(--shadow-right);
  height: 74rem;
  padding: 2rem;
  border-right: 1px solid var(--black-400);
  overflow: auto;
  @media (max-width: 960px) {
    width: 100%;
    box-shadow: var(--shadow-bottom);
    border-right: 0px solid var(--black-400);
    padding-bottom: 0;
    height: auto;
  }  
`;

const DropdownEl = styled.div`
  margin: 2rem 0;
  &:first-of-type{
    margin-top: 0;
  }
`;

const DropdownTitle = styled.div`
  font-size: 1.4rem;
  color: var(--black-700);
  margin-bottom: 1rem;
  line-height: 1.8rem;
`;

const Subnote = styled.span`
  font-size: 1.2rem;
  color: var(--black-550);
`;

const FiltersEl = styled.div`
  padding: 1rem 0 0 0;
  border-top: 1px solid var(--black-400);
  @media (max-width: 960px) {
    padding: 2rem 0;
  }  

`;

const FilterTitle = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  margin-left: -5px;
  margin-bottom: 1rem;
`;

const CheckboxEl = styled.div`
  margin: 1rem 0;
  @media (max-width: 960px) {
    margin: 0 0.5rem;
  }  
`;

const ButtonEl = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1rem 0 2rem 0;
  button {
    margin-right: 1rem;
    margin-top: 1rem;
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }
`;

const CheckboxContainer = styled.div`
  display: inline;
  @media (max-width: 960px) {
    display: flex;
  }  
`;

const AccordionIconEl = styled.div`
  display: flex;
`;

export const Settings = (props: Props) => {
  const {
    indicators,
    regions,
    countries,
  } = props;
  const {
    graphType,
    xAxisIndicator,
    yAxisIndicator,
    showLabel,
    useSameRange,
    showMostRecentData,
    selectedCountryGroup,
    selectedCountries,
    selectedIncomeGroups,
    selectedRegions,
    reverseOrder,
    updateSelectedCountryGroup,
    updateColorIndicator,
    updateXAxisIndicator,
    updateYAxisIndicator,
    updateSizeIndicator,
    updateSelectedRegions,
    updateSelectedCountries,
    updateSelectedIncomeGroups,
    updateShowLabel,
    updateShowMostRecentData,
    updateShowSource,
    updateUseSameRange,
    updateMultiCountrytrendChartCountries,
    updateReverseOrder,
    verticalBarLayout,
    updateBarLayout,
  } = useContext(Context) as CtxDataType;
  const options = graphType === 'scatterPlot'
    ? indicators.filter((d) => d.ScatterPlot).map((d) => d.IndicatorLabelTable)
    : graphType === 'map'
      ? indicators.filter((d) => d.Map).map((d) => d.IndicatorLabelTable)
      : graphType === 'barGraph'
        ? indicators.filter((d) => d.BarGraph).map((d) => d.IndicatorLabelTable)
        : indicators.filter((d) => d.years.length > 0).map((d) => d.IndicatorLabelTable);
  const sizeOptions = indicators.filter((d) => d.Sizing).map((d) => d.IndicatorLabelTable);
  const colorOptions = indicators.filter((d) => d.IsCategorical).map((d) => d.IndicatorLabelTable);
  colorOptions.unshift('Human Development Index');
  colorOptions.unshift('Income Groups');
  colorOptions.unshift('Continents');
  const [settingExpanded, setSettingsExpanded] = useState(true);
  const [filterExpanded, setFilterExpanded] = useState(true);
  useEffect(() => {
    if (options.findIndex((d) => d === xAxisIndicator) === -1) {
      updateXAxisIndicator(options[0]);
    }
    if (options.findIndex((d) => d === yAxisIndicator) === -1 && (graphType === 'scatterPlot' || graphType === 'trendLine')) {
      updateYAxisIndicator(options[0]);
    }
  }, [graphType, options]);
  return (
    <El>
      <DropdownEl>
        <DropdownTitle>
          {
            graphType === 'scatterPlot'
              ? 'X-Axis'
              : graphType === 'map'
                ? 'Indicator to color region'
                : 'Indicator'
          }
        </DropdownTitle>
        <Select
          showSearch
          style={
            {
              width: '100%',
              borderRadius: '1rem',
            }
          }
          placeholder='Please select'
          value={xAxisIndicator}
          onChange={(d) => { updateXAxisIndicator(d); }}
          defaultValue={DEFAULT_VALUES.firstMetric}
        >
          {
            options.map((d) => (
              <Select.Option key={d}>{d}</Select.Option>
            ))
          }
        </Select>
      </DropdownEl>
      {
        graphType === 'scatterPlot'
          ? (
            <DropdownEl>
              <DropdownTitle>
                Y-Axis
              </DropdownTitle>
              <Select
                showSearch
                style={{ width: '100%' }}
                value={yAxisIndicator}
                placeholder='Please select'
                onChange={(d) => { updateYAxisIndicator(d); }}
                defaultValue={DEFAULT_VALUES.secondMetric}
              >
                {
                  options.map((d) => (
                    <Select.Option key={d}>{d}</Select.Option>
                  ))
                }
              </Select>
            </DropdownEl>
          ) : graphType === 'map' ? (
            <DropdownEl>
              <DropdownTitle>
                Secondary Indicator
                {' '}
                <Subnote>Use Backspace to remove selection</Subnote>
              </DropdownTitle>
              <Select
                showSearch
                allowClear
                style={{ width: '100%' }}
                value={yAxisIndicator}
                placeholder='Please select'
                onChange={(d) => { updateYAxisIndicator(d); }}
                defaultValue={DEFAULT_VALUES.secondMetric}
              >
                {
                  options.map((d) => (
                    <Select.Option key={d}>{d}</Select.Option>
                  ))
                }
              </Select>
            </DropdownEl>
          ) : graphType === 'trendLine' ? (
            <DropdownEl>
              <DropdownTitle>
                Secondary Indicator
              </DropdownTitle>
              <Select
                showSearch
                style={{ width: '100%' }}
                value={yAxisIndicator}
                placeholder='Please select'
                onChange={(d) => { updateYAxisIndicator(d); }}
                defaultValue={DEFAULT_VALUES.secondMetric}
              >
                {
                  options.map((d) => (
                    <Select.Option key={d}>{d}</Select.Option>
                  ))
                }
              </Select>
            </DropdownEl>
          ) : null
      }
      {
        graphType === 'map' || graphType === 'scatterPlot' ? (
          <DropdownEl>
            <DropdownTitle>
              Size By
              {' '}
              <Subnote>Use Backspace to remove selection</Subnote>
            </DropdownTitle>
            <Select
              allowClear
              showSearch
              style={{ width: '100%' }}
              placeholder='Size By'
              onChange={(d) => { updateSizeIndicator(d); }}
            >
              {
                sizeOptions.map((d) => (
                  <Select.Option key={d}>{d}</Select.Option>
                ))
              }
            </Select>
          </DropdownEl>
        ) : null
      }
      {
        graphType === 'barGraph' || graphType === 'scatterPlot' ? (
          <DropdownEl>
            <DropdownTitle>
              Color By
              {' '}
              <Subnote>Use Backspace to remove selection</Subnote>
            </DropdownTitle>
            <Select
              showSearch
              style={{ width: '100%' }}
              placeholder='Color By'
              onChange={(d) => { updateColorIndicator(d); }}
              defaultValue={DEFAULT_VALUES.colorMetric}
            >
              {
                colorOptions.map((d) => (
                  <Select.Option key={d}>{d}</Select.Option>
                ))
              }
            </Select>
          </DropdownEl>
        ) : null
      }
      <ButtonEl>
        <Button type='primary' onClick={() => { updateShowSource(true); }}>Data Source</Button>
        <Button
          type='primary'
          onClick={() => {
            // tslint:disable-next-line: no-floating-promises
            domtoimage
              .toPng(document.getElementById('graph-node') as HTMLElement)
              .then((dataUrl: any) => {
                const link = document.createElement('a');
                link.download = 'graph.png';
                link.href = dataUrl;
                link.click();
              });
          }}
        >
          Download Graph
        </Button>
      </ButtonEl>
      <FiltersEl>
        <FilterTitle onClick={() => { setSettingsExpanded(!settingExpanded); }}>
          <AccordionIconEl>
            {
              settingExpanded
                ? <ChevronDown fill='#212121' size={20} /> : <ChevronLeft fill='#212121' size={20} />
            }
          </AccordionIconEl>
          <div style={{ marginTop: '2px' }}>
            Settings
            {' '}
            &
            {' '}
            Options
          </div>
        </FilterTitle>
        <div style={{ display: settingExpanded ? 'inline' : 'none' }}>
          {
            graphType !== 'trendLine' && graphType !== 'multiCountryTrendLine'
              ? (
                <CheckboxContainer>
                  {
                    graphType === 'scatterPlot'
                      ? (
                        <CheckboxEl>
                          <Checkbox checked={showLabel} onChange={(e) => { updateShowLabel(e.target.checked); }}>Show Label</Checkbox>
                        </CheckboxEl>
                      )
                      : null
                  }
                  <CheckboxEl>
                    <Checkbox checked={showMostRecentData} onChange={(e) => { updateShowMostRecentData(e.target.checked); }}>Show Most Recent Avalable Data</Checkbox>
                  </CheckboxEl>
                  {
                    graphType === 'barGraph'
                      ? (
                        <>
                          <CheckboxEl>
                            <Checkbox checked={!verticalBarLayout} onChange={(e) => { updateBarLayout(!e.target.checked); }}>Show Horizontal</Checkbox>
                          </CheckboxEl>
                          <CheckboxEl>
                            <Checkbox disabled={!verticalBarLayout} checked={reverseOrder} onChange={(e) => { updateReverseOrder(e.target.checked); }}>Show Largest First</Checkbox>
                          </CheckboxEl>
                        </>
                      )
                      : null
                  }
                </CheckboxContainer>
              ) : null
          }
          {
            graphType === 'trendLine'
              ? (
                <CheckboxContainer>
                  <CheckboxEl>
                    <Checkbox checked={showLabel} onChange={(e) => { updateShowLabel(e.target.checked); }}>Show Label</Checkbox>
                  </CheckboxEl>
                  <CheckboxEl>
                    <Checkbox checked={useSameRange} onChange={(e) => { updateUseSameRange(e.target.checked); }}>Use Same Range for Both Y-Axes</Checkbox>
                  </CheckboxEl>
                </CheckboxContainer>
              ) : null
          }
          {
            graphType === 'multiCountryTrendLine'
              ? (
                <CheckboxEl>
                  <Checkbox checked={showLabel} onChange={(e) => { updateShowLabel(e.target.checked); }}>Show Label</Checkbox>
                </CheckboxEl>
              ) : null
          }
        </div>
      </FiltersEl>
      {
        graphType !== 'trendLine' && graphType !== 'multiCountryTrendLine'
          ? (
            <FiltersEl>
              <FilterTitle onClick={() => { setFilterExpanded(!filterExpanded); }}>
                <AccordionIconEl>
                  {
                    filterExpanded
                      ? <ChevronDown fill='#212121' size={20} /> : <ChevronLeft fill='#212121' size={20} />
                  }
                </AccordionIconEl>
                <div style={{ marginTop: '2px' }}>
                  Filter or Highlight By
                </div>
              </FilterTitle>
              <div style={{ display: filterExpanded ? 'inline' : 'none' }}>
                <DropdownEl>
                  <DropdownTitle>
                    Region
                  </DropdownTitle>
                  <Select
                    mode='multiple'
                    allowClear
                    style={{ width: '100%' }}
                    placeholder='Filter By Regions'
                    value={selectedRegions}
                    onChange={(d: string[]) => { updateSelectedRegions(d); }}
                  >
                    {
                    regions.map((d) => (
                      <Select.Option key={d}>{d}</Select.Option>
                    ))
                  }
                  </Select>
                </DropdownEl>
                <DropdownEl>
                  <DropdownTitle>
                    Income Group
                  </DropdownTitle>
                  <Select
                    mode='multiple'
                    allowClear
                    style={{ width: '100%' }}
                    placeholder='Filter By Income Group'
                    value={selectedIncomeGroups}
                    onChange={(d: string[]) => { updateSelectedIncomeGroups(d); }}
                  >
                    {
                    INCOME_GROUPS.map((d) => (
                      <Select.Option key={d}>{d}</Select.Option>
                    ))
                  }
                  </Select>
                </DropdownEl>
                <DropdownEl>
                  <DropdownTitle>
                    Country Groups
                  </DropdownTitle>
                  <Radio.Group onChange={(d) => { updateSelectedCountryGroup(d.target.value); }} value={selectedCountryGroup} buttonStyle='solid' size='small'>
                    <Radio.Button value='All'>All</Radio.Button>
                    <Radio.Button value='LDC'>LDC</Radio.Button>
                    <Radio.Button value='LLDC'>LLDC</Radio.Button>
                    <Radio.Button value='SIDS'>SIDS</Radio.Button>
                  </Radio.Group>
                </DropdownEl>
                <DropdownEl>
                  <DropdownTitle>
                    Countries
                  </DropdownTitle>
                  <Select
                    mode='multiple'
                    allowClear
                    style={{ width: '100%' }}
                    value={selectedCountries}
                    placeholder='Filter By Countries'
                    onChange={(d: string[]) => { updateSelectedCountries(d); updateMultiCountrytrendChartCountries(d); }}
                  >
                    {
                      countries.map((d) => (
                        <Select.Option key={d}>{d}</Select.Option>
                      ))
                    }
                  </Select>
                </DropdownEl>
              </div>
            </FiltersEl>
          ) : null
      }
    </El>
  );
};
