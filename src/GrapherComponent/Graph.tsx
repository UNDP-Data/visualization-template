import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Slider } from 'antd';
import 'antd/dist/antd.css';
import intersection from 'lodash.intersection';
import { CtxDataType, DataType, IndicatorMetaDataWithYear } from '../Types';
import Context from '../Context/Context';
import { HorizontalBarChart } from './HorizontalBarChart';
import { ScatterPlot } from './ScatterPlot';
import { BivariateMap } from './BivariateMap';
import { UnivariateMap } from './UnivariateMap';
import { LineChart } from './LineChart';
import { MultiLineChart } from './MultiLineChart';
import { BarChart } from './BarChart';

interface Props {
  data: DataType[];
  indicators: IndicatorMetaDataWithYear[];
  countries: string[];
}

const El = styled.div`
  width: 75%;
  box-shadow: var(--shadow-right);
  height: 74rem;
  overflow: auto;
  @media (max-width: 960px) {
    width: 100%;
  }
`;

const SliderEl = styled.div`
  padding: 2rem 0 3rem 0;
  background-color: var(--black-200);
  box-shadow: var(--shadow-bottom);
  position: sticky;
  top: 0;
`;

const ErrorNote = styled.div`
  padding: 1.8rem 2rem;
  background-color: var(--red-bg);
  color: var(--red);
  height: 6.2rem;
  box-shadow: var(--shadow-bottom); 
  text-align: center;
  font-style: italic;
  position: sticky;
  top: 0;
`;

const InfoNote = styled.div`
  padding: 1.8rem 2rem;
  background-color: var(--black-200);
  color: var(--primary-blue);
  box-shadow: var(--shadow-bottom); 
  height: 6.2rem;
  font-style: italic;
  text-align: center;
  position: sticky;
  top: 0;
`;

const getMarks = (arr: number[]) => {
  const marksTemp: any = {};
  arr.forEach((d) => {
    marksTemp[`${d}`] = d;
  });
  return marksTemp;
};

export const Graph = (props: Props) => {
  const {
    data,
    indicators,
    countries,
  } = props;
  const {
    year,
    graphType,
    xAxisIndicator,
    yAxisIndicator,
    sizeIndicator,
    showMostRecentData,
    updateYear,
    verticalBarLayout,
  } = useContext(Context) as CtxDataType;
  const [commonYears, setCommonYears] = useState<number[]>([]);
  const [marks, setMarks] = useState<any>(undefined);

  useEffect(() => {
    if (graphType !== 'barGraph') {
      if (yAxisIndicator) {
        if (!sizeIndicator) {
          const intersectedYears = intersection(indicators[indicators.findIndex((d) => d.IndicatorLabelTable === xAxisIndicator)].years, indicators[indicators.findIndex((d) => d.IndicatorLabelTable === yAxisIndicator)].years);
          setCommonYears(intersectedYears);
          setMarks(getMarks(intersectedYears));
          updateYear(intersectedYears.length === 0 ? -1 : intersectedYears[intersectedYears.length - 1]);
        } else {
          const intersectedYears = intersection(indicators[indicators.findIndex((d) => d.IndicatorLabelTable === xAxisIndicator)].years,
            indicators[indicators.findIndex((d) => d.IndicatorLabelTable === yAxisIndicator)].years,
            indicators[indicators.findIndex((d) => d.IndicatorLabelTable === sizeIndicator)].years);
          setCommonYears(intersectedYears);
          setMarks(getMarks(intersectedYears));
          updateYear(intersectedYears.length === 0 ? -1 : intersectedYears[intersectedYears.length - 1]);
        }
      } else if (!sizeIndicator) {
        setCommonYears(indicators[indicators.findIndex((d) => d.IndicatorLabelTable === xAxisIndicator)].years);
        setMarks(getMarks(indicators[indicators.findIndex((d) => d.IndicatorLabelTable === xAxisIndicator)].years));
        updateYear(indicators[indicators.findIndex((d) => d.IndicatorLabelTable === xAxisIndicator)].years[indicators[indicators.findIndex((d) => d.IndicatorLabelTable === xAxisIndicator)].years.length - 1]);
      } else {
        const intersectedYears = intersection(indicators[indicators.findIndex((d) => d.IndicatorLabelTable === xAxisIndicator)].years, indicators[indicators.findIndex((d) => d.IndicatorLabelTable === sizeIndicator)].years);
        setCommonYears(intersectedYears);
        setMarks(getMarks(intersectedYears));
        updateYear(intersectedYears.length === 0 ? -1 : intersectedYears[intersectedYears.length - 1]);
      }
    } else {
      setCommonYears(indicators[indicators.findIndex((d) => d.IndicatorLabelTable === xAxisIndicator)].years);
      setMarks(getMarks(indicators[indicators.findIndex((d) => d.IndicatorLabelTable === xAxisIndicator)].years));
      updateYear(indicators[indicators.findIndex((d) => d.IndicatorLabelTable === xAxisIndicator)].years[indicators[indicators.findIndex((d) => d.IndicatorLabelTable === xAxisIndicator)].years.length - 1]);
    }
  }, [xAxisIndicator, yAxisIndicator, sizeIndicator, graphType]);

  return (
    <El id='graph-node'>
      {
        graphType === 'trendLine' || graphType === 'multiCountryTrendLine' ? null
          : commonYears.length > 1 && !showMostRecentData ? (
            <SliderEl>
              <Slider
                min={marks[Object.keys(marks)[0]]}
                max={marks[Object.keys(marks)[Object.keys(marks).length - 1]]}
                marks={marks}
                step={null}
                value={year}
                style={{ width: '95%', margin: '0 auto' }}
                onChange={(d) => { updateYear(d); }}
              />
            </SliderEl>
          ) : commonYears.length === 0 || showMostRecentData ? (
            <ErrorNote>
              {
              commonYears.length === 0
                ? 'The data selected are not available for the same years therefore showing the last available data for all the countries.'
                : 'Showing the last available data for all the countries.'
            }
            </ErrorNote>
          ) : (
            <InfoNote>
              The common year for the data selected is
              {' '}
              {commonYears[0]}
            </InfoNote>
          )
      }
      {
        graphType === 'scatterPlot'
          ? yAxisIndicator
            ? (
              <ScatterPlot
                data={data}
                indicators={indicators}
              />
            ) : null
          : graphType === 'map'
            ? yAxisIndicator
              ? (
                <BivariateMap
                  data={data}
                  indicators={indicators}
                />
              )
              : (
                <UnivariateMap
                  data={data}
                  indicators={indicators}
                />
              )
            : graphType === 'barGraph'
              ? verticalBarLayout ? (
                <HorizontalBarChart
                  data={data}
                  indicators={indicators}
                />
              )
                : (
                  <BarChart
                    data={data}
                    indicators={indicators}
                  />
                )
              : graphType === 'trendLine'
                ? yAxisIndicator
                  ? (
                    <LineChart
                      data={data}
                      indicators={indicators}
                      countries={countries}
                    />
                  ) : null
                : (
                  <MultiLineChart
                    data={data}
                    indicators={indicators}
                    countries={countries}
                  />
                )

      }
    </El>
  );
};
