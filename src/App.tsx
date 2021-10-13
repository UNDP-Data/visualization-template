import React, { useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import  { csv } from 'd3-request';
import { nest } from 'd3-collection';
import _  from 'lodash';
import { IndicatorDataType, DataType, IndicatorOptionsDataType } from './Types';
import { VizArea } from './VizArea';
import CategoricalData from './Data/CategoricalData.json';


const GlobalStyle = createGlobalStyle`
  :root {
    --primary-blue: #0969FA;
    --white: #ffffff;
    --light-gray:#FAFAFA;
    --bg-blue:  #E7F1FF;
    --text-color:#110848;
    --black: #110848;
    --navy: #110848;
    --medium-grey: #CCCCCC;
    --grey: #919399;
    --grey-c3: #B5BFCC;
    --dark-grey: #383838;
    --dropdown-bg: #E9ECF6;
  }
  
  html { 
    font-size: 62.5%; 
  }

  .react-dropdown-select-option{
    color:var(--black) !important;
    background-color:var(--primary-color-light) !important;
  }
  .react-dropdown-select-option-label, .react-dropdown-select-option-remove{
    font-weight: 400;
    background-color:var(--primary-color-light);
    padding: 0.5rem;
  }

  body {
    font-family: "proxima-nova", "Helvetica Neue", "sans-serif";
    color: var(--text-color);
    background-color: var(--white);
    margin: 0;
    padding: 0 2rem;
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 2.56rem;
  }

  a {
    text-decoration: none;
    color: var(--color-blue);
  }

  h3 {
    color: var(--navy);
    font-size: 3.2rem;
    font-weight: 700;
  }

  button.primary {
    font-size: 1.3rem;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--light-gray);
    border-radius: 30px;
    padding: 1.5rem 2.5rem;
    background-color: var(---primary-blue);
    box-shadow: none;
  }

  button.secondary {
    font-size: 1.6rem;
    line-height: 2.4rem;
    font-weight: 600;
    text-transform: uppercase;
    background-color: none;
    box-shadow: none;
  }

  a:hover {
    font-weight: bold;
  }

  .bold{
    font-weight: 700;
  }

  .react-dropdown-select-content {
    padding: 0.5rem 1rem;
    font-weight: 600;
    font-size: 1.4rem;
    text-overflow: ellipsis !important;
    white-space: nowrap;
    overflow: hidden;
    height: 3.6rem !important;
  }
  .react-dropdown-select {
    border: 2px solid #f2f7ff !important;
  	width: 27.6rem !important;
    border-radius: 3rem !important;
    background-color: var(--dropdown-bg);
    padding: 0;
  }
  .react-dropdown-select:hover, .react-dropdown-select:focus {
    border: 2px solid #919399 !important;
  }

  .react-dropdown-select-dropdown-handle svg  {
    width: 1.8rem !important;
    height: 1.8rem !important;
    margin: -4px 1.5rem !important; 
    padding-top: -2px !important;
    fill: var(--gray) !important;
  }

  .react-dropdown-select-input{
    display: none;
  }

  .react-dropdown-select-dropdown{
    font-size: 1.2rem !important;
    box-shadow: 0px 10px 20px 0px rgb(9 105 250 / 15%) !important;
    border: 0 !important;
  }

  .react-dropdown-select-item:hover, .react-dropdown-select-item:hover:focus{
    background-color: var(--bg-blue) !important;
  }

  .react-dropdown-select-item-selected {
    background-color: var(--navy) !important;
  }

  .italics{
    font-style: italic;
  }
`;

const App = () => {
  const [data, setData] = useState<DataType[] | undefined>(undefined);
  const [indicatorsList, setIndicatorsList] = useState<IndicatorOptionsDataType[] | undefined>(undefined);
  const [regionList, setRegionList] = useState<string[] | undefined>(undefined);
  useEffect(() => {
    csv('./data/Data-explorer-data.csv', function(error, data) {
      if (error) throw error;
      const indicatorsDetails: IndicatorOptionsDataType[] = _.sortBy(_.uniqBy(data, 'Indicator').map(d => {
        return {
          'Data source link': d['Data source link'] as string,
          'Data source name': d['Data source name'] as string,
          'Indicator': d['Indicator'] as string,
          'Time period': d['Time period'] as string,
          'Indicator Description': d['Indicator Description'] as string,
          'Year': d['Year'] as string,
          'Categorical': CategoricalData.findIndex(el => el.indicator === d['Indicator']) !== -1 ? true : false,
        };
      }), d => d.Indicator);

      const regions = _.uniqBy(data, 'Group 1').map(d => d['Group 1']).filter(d => d !== '').sort();
      regions.push('Null');

      const dataNestedByCountries = nest()
        .key((d:any) =>  d['Alpha-3 code-1'])
        .entries(data);
      const formattedData: DataType[] = dataNestedByCountries.map((d:any) => {
        const indicator: IndicatorDataType[] = _.uniqBy(d.values,'Indicator').map((d:any) => {
          return {
            'Indicator': d['Indicator'] as string,
            'Value': +d['Value'],
          };
        });
        const indicatorList: string[] = _.uniqBy(d.values,'Indicator').map((d:any) =>  d['Indicator'] as string);
        return {
          'Alpha-2 code': d.values[0]['Alpha-2 code'] as string,
          'Alpha-3 code-1': d.values[0]['Alpha-3 code-1'] as string,
          'Country or Area': d.values[0]['Country or Area'] as string,
          'Development classification': d.values[0]['Development classification'] as string,
          'Group 1': d.values[0]['Group 1'] as string,
          'Group 2': d.values[0]['Group 2'] as string,
          'Group 3': d.values[0]['Group 3'] as string,
          'LDC': d.values[0]['LDC'] === 'TRUE' ? true : false,
          'LLDC': d.values[0]['LLDC'] === 'TRUE' ? true : false,
          'Latitude (average)': +d.values[0]['Latitude (average)'],
          'Longitude (average)': +d.values[0]['Longitude (average)'],
          'Numeric code': +d.values[0]['Numeric code'],
          'SIDS': d.values[0]['SIDS'] === 'TRUE' ? true : false,
          'Indicators': indicator,
          'IndicatorList': indicatorList,
        };
      });
      setIndicatorsList(indicatorsDetails);
      setData(formattedData);
      setRegionList(regions as string[]);
    });
  },[]);
  return (
    <>
      <GlobalStyle />
      {
        indicatorsList && data && regionList ? 
          <VizArea
            data={data}
            indicators={indicatorsList}
            regions={regionList}
          /> : null
      }
    </>
  );
};

export default App;
