import React from 'react';
import { DataType, OptionsDataType } from '../Types';
import { Graph } from './Graph';

interface Props {
    data: DataType[];
    firstMetric: OptionsDataType;
    secondMetric: OptionsDataType;
    selectedCountryGroup: 'All' | 'LDC' | 'LLDC' | 'SIDS';
    selectedRegion: string[];
}

export const Map = (props: Props) => {
  const {
    data,
    firstMetric,
    secondMetric,
    selectedCountryGroup,
    selectedRegion,
  } = props;

  return (
    <Graph
      data={data}
      firstMetric={firstMetric}
      secondMetric={secondMetric}
      selectedCountryGroup = {selectedCountryGroup}
      selectedRegion={selectedRegion}
    />
  );
};