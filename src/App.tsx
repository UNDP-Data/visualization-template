import { useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import { csv } from 'd3-request';
import { nest } from 'd3-collection';
import _ from 'lodash';
import { IndicatorDataType, DataType, IndicatorOptionsDataType } from './Types';
import { VizArea } from './VizArea';
import CategoricalData from './Data/CategoricalData.json';
import CountryTerritoryGroups from './Data/country-territory-groups.json';

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
    --yellow: #E9CE2C;
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

  button.secondary {
    padding: 2rem;
    border-radius: 0.2rem;
    font-size: 1.4rem;
    font-weight: 700;
    background-color: var(--bg-blue);
    color: var(--navy);
    border: 0;
    text-transform: uppercase;
    margin: 0 1rem;
    cursor: pointer;
    border-radius: 100px;
    padding: 1rem 3rem;
    &:hover {
      background: #B6D3FE;
    }
    &:active{
      background: #84B5FD;
    }
  }

  button.tertiary {
    font-size: 1.4rem;
    font-weight: 500;
    color: var(--primary-blue);
    border: 0;
    text-transform: uppercase;
    background-color: transparent;
    cursor: pointer;
    text-decoration: underline;
    &:hover {
      color: var(--navy);
    }
    &:active{
      color: var(--navy);
    }
  }

  a:hover {
    font-weight: bold;
  }

  .bold{
    font-weight: 700;
  }

  .dropdownMain {
    border: 2px solid #f2f7ff !important;
    width: 27.6rem !important;
    border-radius: 3rem !important;
    background-color: var(--dropdown-bg);
    padding: 0;

    .react-dropdown-select-content {
      padding: 0.5rem 1rem;
      font-weight: 600;
      font-size: 1.4rem;
      text-overflow: ellipsis !important;
      white-space: nowrap !important;
      overflow: hidden;
      height: 3.6rem !important;
    }
    
    .react-dropdown-select-input{
      display: none;
    }
  }
  .dropdownMulti {
    border: 2px solid #f2f7ff !important;
    width: auto !important;
    border-radius: 3rem !important;
    background-color: var(--dropdown-bg);
    padding: 0;

    .react-dropdown-select-type-multi{
      padding: 0 !important;
    }

    .react-dropdown-select-content {
      padding: 0.5rem 1rem;
      font-weight: 600;
      font-size: 1.4rem;
      min-height: 3.6rem !important;
      height: auto !important;
    }
    .react-dropdown-select-option{
      border-radius: 3rem !important;
      background-color: var(--navy) !important;
      color: var(--white) !important;
      &:first-of-type{
        margin-left: 0 !important;
      }
    }
  }

  
  .countrySelect {
    border: 2px solid #f2f7ff !important;
    width: auto !important;
    border-radius: 3rem !important;
    background-color: var(--dropdown-bg);
    padding: 0;

    .react-dropdown-select-type-multi{
      padding: 0 !important;
    }

    .react-dropdown-select-content {
      height: auto !important;
    }

    .react-dropdown-select-option{
      border-radius: 3rem !important;
      background-color: var(--navy) !important;
      color: var(--white) !important;
      &:nth-of-type(n + 3) {
        display: inline !important;
      }
      &:first-of-type{
        margin-left: 0 !important;
      }
    }
  }

  .dropdownMain:hover, .dropdownMain:focus {
    border: 2px solid #919399 !important;
  }

  .react-dropdown-select-dropdown-handle svg  {
    width: 1.8rem !important;
    height: 1.8rem !important;
    margin: -4px 1.5rem !important; 
    padding-top: -2px !important;
    fill: var(--gray) !important;
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


  .react-dropdowm-multi:hover, .react-dropdowm-multi:focus {
    border: 2px solid #919399 !important;
  }

  .italics{
    font-style: italic;
  }
`;

const App = () => {
  const [finalData, setFinalData] = useState<DataType[] | undefined>(undefined);
  const [indicatorsList, setIndicatorsList] = useState<IndicatorOptionsDataType[] | undefined>(undefined);
  const [regionList, setRegionList] = useState<string[] | undefined>(undefined);
  const [countryList, setCountryList] = useState<string[] | undefined>(undefined);
  useEffect(() => {
    csv('./data/Data-explorer-data.csv', (error, data) => {
      if (error) throw error;
      const indicatorsDetails: IndicatorOptionsDataType[] = _.sortBy(_.uniqBy(data, 'Indicator').map((d) => ({
        'Data source link': d['Data source link'] as string,
        'Data source name': d['Data source name'] as string,
        Indicator: d.Indicator as string,
        'Time period': d['Time period'] as string,
        'Indicator Description': d['Indicator Description'] as string,
        Year: d.Year as string,
        Categorical: CategoricalData.findIndex((el) => el.indicator === d.Indicator) !== -1,
      })), (d) => d.Indicator);

      const regions = _.uniqBy(data, 'Group 2').map((d) => d['Group 2']).filter((d) => d !== '').sort();
      const dataNestedByCountries = nest()
        .key((d:any) => d['Alpha-3 code-1'])
        .entries(data);
      const formattedData: DataType[] = dataNestedByCountries.map((d:any) => {
        const indicator: IndicatorDataType[] = _.uniqBy(d.values, 'Indicator').map((el:any) => ({
          Indicator: el.Indicator as string,
          Value: +el.Value,
        }));
        const indicatorList: string[] = _.uniqBy(d.values, 'Indicator').map((el:any) => el.Indicator as string);
        return {
          'Alpha-2 code': d.values[0]['Alpha-2 code'] as string,
          'Alpha-3 code-1': d.values[0]['Alpha-3 code-1'] as string,
          'Country or Area': d.values[0]['Country or Area'] as string,
          'Development classification': d.values[0]['Development classification'] as string,
          'Group 1': d.values[0]['Group 1'] as string,
          'Group 2': d.values[0]['Group 2'] as string,
          'Group 3': d.values[0]['Group 3'] as string,
          LDC: d.values[0].LDC === 'TRUE',
          LLDC: d.values[0].LLDC === 'TRUE',
          'Latitude (average)': +d.values[0]['Latitude (average)'],
          'Longitude (average)': +d.values[0]['Longitude (average)'],
          'Numeric code': +d.values[0]['Numeric code'],
          SIDS: d.values[0].SIDS === 'TRUE',
          Indicators: indicator,
          IndicatorList: indicatorList,
          'Income group': CountryTerritoryGroups[CountryTerritoryGroups.findIndex((el) => el['Alpha-3 code-1'] === d.values[0]['Alpha-3 code-1'])]['Income group'],
        };
      });
      setCountryList(formattedData.map((d) => d['Country or Area']));
      setIndicatorsList(indicatorsDetails);
      setFinalData(formattedData);
      setRegionList(regions as string[]);
    });
  }, []);
  return (
    <>
      <GlobalStyle />
      {
        indicatorsList && finalData && regionList && countryList
          ? (
            <VizArea
              data={finalData}
              indicators={indicatorsList}
              regions={regionList}
              countries={countryList}
            />
          ) : null
      }
    </>
  );
};

export default App;
