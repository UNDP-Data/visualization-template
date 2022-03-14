import { Button, message } from 'antd';
import { useContext } from 'react';
import Context from '../Context/Context';
import { CtxDataType } from '../Types';

const ArrToString = (d: string[]) => {
  let stringValTemp = '';
  d.forEach((el) => {
    stringValTemp += `~${el.replace(/ /g, '+')}`;
  });
  const stringVal = stringValTemp.substring(1);
  return stringVal;
};

const CovertStringForParam = (d: string) => d.replace(/ /g, '+');

export const CopyLinkWithParamButton = () => {
  const {
    graphType,
    selectedRegions,
    selectedCountries,
    selectedIncomeGroups,
    selectedCountryGroup,
    xAxisIndicator,
    yAxisIndicator,
    colorIndicator,
    sizeIndicator,
    showMostRecentData,
    showLabel,
    trendChartCountry,
    multiCountrytrendChartCountries,
    useSameRange,
    reverseOrder,
    verticalBarLayout,
  } = useContext(Context) as CtxDataType;
  const graphParam = `graphType=${graphType}`;
  const regionsParam = selectedRegions.length > 0 ? `&regions=${ArrToString(selectedRegions)}` : '';
  const countries = selectedCountries.length > 0 ? `&countries=${ArrToString(selectedCountries)}` : '';
  const incomeGroupsParam = selectedRegions.length > 0 ? `&incomeGroups=${ArrToString(selectedIncomeGroups)}` : '';
  const countryGroupParam = selectedCountryGroup === 'All' ? '' : `&countryGroup=${CovertStringForParam(selectedCountryGroup)}`;
  const firstMetricParam = `&firstMetric=${CovertStringForParam(xAxisIndicator)}`;
  const secondMetricParam = yAxisIndicator ? `&secondMetric=${CovertStringForParam(yAxisIndicator)}` : '';
  const colorMetricParam = `&colorMetric=${CovertStringForParam(colorIndicator)}`;
  const sizeMetricParam = sizeIndicator ? `&sizeMetric=${CovertStringForParam(sizeIndicator)}` : '';
  const showMostRecentDataParam = showMostRecentData === true ? '&showMostRecentData=true' : '';
  const showLabelParam = showLabel === true ? '&showLabel=true' : '';
  const trendChartCountryParam = trendChartCountry ? `&trendChartCountry=${CovertStringForParam(trendChartCountry)}` : '';
  const multiCountrytrendChartCountriesParam = multiCountrytrendChartCountries.length > 0 ? `&multiCountrytrendChartCountries=${ArrToString(multiCountrytrendChartCountries)}` : '';
  const useSameRangeParam = useSameRange === true ? '&useSameRange=true' : '';
  const reverseOrderParam = reverseOrder === true ? '&reverseOrder=true' : '';
  const verticalBarLayoutParam = verticalBarLayout === false ? '&verticalBarLayout=false' : '';
  const queryParams = graphParam
    + regionsParam
    + countries
    + incomeGroupsParam
    + countryGroupParam
    + firstMetricParam
    + secondMetricParam
    + colorMetricParam
    + sizeMetricParam
    + showMostRecentDataParam
    + showLabelParam
    + trendChartCountryParam
    + multiCountrytrendChartCountriesParam
    + useSameRangeParam
    + reverseOrderParam
    + verticalBarLayoutParam;
  return (
    <Button
      type='default'
      onClick={() => {
        navigator.clipboard.writeText(`https://data.undp.org/access-all-data-viz/?${queryParams}`);
        message.success({ content: 'Embed Link Copied', duration: 2 });
      }}
    >
      Copy Link
    </Button>
  );
};
