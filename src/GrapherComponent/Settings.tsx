import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import {
  Select, Radio, Checkbox, Button,
} from 'antd';
import 'antd/dist/antd.css';
import domtoimage from 'dom-to-image';
import { CtxDataType, IndicatorMetaDataWithYear } from '../Types';
import Context from '../Context/Context';
import { DEFAULT_VALUES, INCOME_GROUPS } from '../Constants';

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
  padding-top: 2rem;
  border-top: 1px solid var(--black-400);
`;

const FilterTitle = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
`;

const CheckboxEl = styled.div`
  margin: 1rem 0;
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
      {
        graphType !== 'trendLine'
          ? (
            <FiltersEl>
              <FilterTitle>
                Settings
                {' '}
                &
                {' '}
                Options
              </FilterTitle>
              {
              graphType === 'scatterPlot'
                ? (
                  <CheckboxEl>
                    <Checkbox onChange={(e) => { updateShowLabel(e.target.checked); }}>Show Label</Checkbox>
                  </CheckboxEl>
                )
                : null
            }
              <CheckboxEl>
                <Checkbox onChange={(e) => { updateShowMostRecentData(e.target.checked); }}>Show Most Recent Avalable Data</Checkbox>
              </CheckboxEl>
            </FiltersEl>
          ) : null
      }
      {
        graphType !== 'trendLine'
          ? (
            <FiltersEl>
              <FilterTitle>Filter or Highlight By</FilterTitle>
              <DropdownEl>
                <DropdownTitle>
                  Region
                </DropdownTitle>
                <Select
                  mode='multiple'
                  allowClear
                  style={{ width: '100%' }}
                  placeholder='Filter By Regions'
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
                <Radio.Group onChange={(d) => { updateSelectedCountryGroup(d.target.value); }} defaultValue='All' buttonStyle='solid' size='small'>
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
                  placeholder='Filter By Countries'
                  onChange={(d: string[]) => { updateSelectedCountries(d); }}
                >
                  {
                    countries.map((d) => (
                      <Select.Option key={d}>{d}</Select.Option>
                    ))
                  }
                </Select>
              </DropdownEl>
            </FiltersEl>
          ) : null
      }
    </El>
  );
};
