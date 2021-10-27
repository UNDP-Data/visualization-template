import _ from 'lodash';
import { DataType, OptionsDataType } from '../Types';
import { Graph } from './Graph';

interface Props {
    data: DataType[];
    firstMetric: OptionsDataType;
    colorMetric: OptionsDataType;
    selectedCountryGroup: 'All' | 'LDC' | 'LLDC' | 'SIDS';
    selectedRegion: string[];
    selectedCountries: string[];
    selectedIncomeGroups: string[];
}

export const BarGraph = (props: Props) => {
  const {
    data,
    firstMetric,
    colorMetric,
    selectedCountryGroup,
    selectedRegion,
    selectedCountries,
    selectedIncomeGroups,
  } = props;

  const dataFiltered = data.filter((d) => d.IndicatorList.indexOf(firstMetric.Indicator) !== -1);

  const dataFilteredByRegions = selectedRegion.length > 0 ? dataFiltered.filter((d) => selectedRegion.indexOf(d['Group 2']) !== -1) : dataFiltered;

  const dataFilteredByCountryGroup = selectedCountryGroup === 'All' ? dataFilteredByRegions : dataFilteredByRegions.filter((d) => d[selectedCountryGroup]);

  const dataFilteredByIncomeGroups = selectedIncomeGroups.length > 0 ? dataFilteredByCountryGroup.filter((d) => selectedIncomeGroups.indexOf(d['Income Group']) !== -1) : dataFilteredByCountryGroup;

  const dataSorted = _.sortBy(dataFilteredByIncomeGroups, (d) => d.Indicators[d.Indicators.findIndex((el) => el.Indicator === firstMetric.Indicator)].Value);

  return (
    <Graph
      data={dataSorted}
      firstMetric={firstMetric}
      colorMetric={colorMetric}
      selectedCountries={selectedCountries}
    />
  );
};
