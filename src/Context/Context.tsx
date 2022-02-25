import { createContext } from 'react';
import { CtxDataType } from '../Types';

const Context = createContext<CtxDataType>({
  graphType: 'scatterPlot',
  selectedRegions: [],
  selectedCountries: [],
  selectedIncomeGroups: [],
  selectedCountryGroup: 'All',
  showMostRecentData: false,
  year: 2021,
  xAxisIndicator: '',
  yAxisIndicator: '',
  colorIndicator: '',
  sizeIndicator: '',
  showLabel: false,
  showSource: false,
  updateGraphType: (_d: 'scatterPlot' | 'map' | 'barGraph' | 'trendLine') => {},
  updateSelectedRegions: (_d: string[]) => {},
  updateSelectedCountries: (_d: string[]) => {},
  updateSelectedIncomeGroups: (_d: string[]) => {},
  updateYear: (_d: number) => {},
  updateSelectedCountryGroup: (_d: 'All' | 'SIDS' | 'LLDC' | 'LDC') => {},
  updateXAxisIndicator: (_d: string) => {},
  updateYAxisIndicator: (_d?: string) => {},
  updateColorIndicator: (_d?: string) => {},
  updateSizeIndicator: (_d?: string) => {},
  updateShowMostRecentData: (_d: boolean) => {},
  updateShowLabel: (_d: boolean) => {},
  updateShowSource: (_d: boolean) => {},
});

export default Context;
