import _ from 'lodash';
import React from 'react';
import { DataType, OptionsDataType } from '../Types';
import { Graph } from './Graph';

interface Props {
    data: DataType[];
    firstMetric: OptionsDataType;
    colorMetric: OptionsDataType;
    selectedCountryGroup: 'All' | 'LDC' | 'LLDC' | 'SIDS';
    selectedRegion: string[];
}

export const BarGraph = (props: Props) => {
  const {
    data,
    firstMetric,
    colorMetric,
    selectedCountryGroup,
    selectedRegion,
  } = props;

  const dataFiltered = data.filter(d => d.IndicatorList.indexOf(firstMetric.Indicator) !== -1); 
  
  const dataFilteredByCountryGroup = selectedCountryGroup === 'All' ? dataFiltered.filter(d => selectedRegion.indexOf(d['Group 1']) !== -1) : dataFiltered.filter(d => d[selectedCountryGroup] && selectedRegion.indexOf(d['Group 1']) !== -1);

  const dataSorted = _.sortBy(dataFilteredByCountryGroup, d => d.Indicators[d.Indicators.findIndex(el => el.Indicator === firstMetric.Indicator)].Value);

  return (
    <Graph
      data={dataSorted}
      firstMetric={firstMetric}
      colorMetric={colorMetric}
    />
  );
};