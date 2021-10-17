import _ from 'lodash';
import React from 'react';
import { DataType, OptionsDataType } from '../Types';
import { Graph } from './Graph';

interface Props {
    data: DataType[];
    firstMetric: OptionsDataType;
    secondMetric: OptionsDataType;
    colorMetric: OptionsDataType;
    sizeMetric: OptionsDataType;
    selectedCountryGroup: 'All' | 'LDC' | 'LLDC' | 'SIDS';
    selectedRegion: string[];
}

export const ScatterPlot = (props: Props) => {
  const {
    data,
    firstMetric,
    secondMetric,
    colorMetric,
    sizeMetric,
    selectedCountryGroup,
    selectedRegion,
  } = props;

  const dataFiltered = sizeMetric.Indicator !== 'Not Selected' ?  
    data.filter(d => d.IndicatorList.indexOf(firstMetric.Indicator) !== -1 && d.IndicatorList.indexOf(secondMetric.Indicator) !== -1 && d.IndicatorList.indexOf(sizeMetric.Indicator) !== -1) : 
    data.filter(d => d.IndicatorList.indexOf(firstMetric.Indicator) !== -1 && d.IndicatorList.indexOf(secondMetric.Indicator) !== -1);
  
  const dataFilteredByCountryGroup = selectedCountryGroup === 'All' ? dataFiltered.filter(d => selectedRegion.indexOf(d['Group 1']) !== -1) : dataFiltered.filter(d => d[selectedCountryGroup] && selectedRegion.indexOf(d['Group 1']) !== -1);

  
  const dataSorted = sizeMetric.Indicator === 'Not Selected' ? dataFilteredByCountryGroup : _.reverse(_.sortBy(dataFilteredByCountryGroup, d => d.Indicators[d.Indicators.findIndex(el => el.Indicator === sizeMetric.Indicator)].Value));

  return (
    <>
      {
        dataSorted.length > 0 ? 
          <Graph
            data={dataSorted}
            firstMetric={firstMetric}
            secondMetric={secondMetric}
            sizeMetric={sizeMetric}
            colorMetric={colorMetric}
          /> : null
      }
    </>
  );
};