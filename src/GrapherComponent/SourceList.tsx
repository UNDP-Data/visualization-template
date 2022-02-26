import { useContext } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { CtxDataType, IndicatorMetaDataWithYear } from '../Types';
import Context from '../Context/Context';

interface Props {
  indicators: IndicatorMetaDataWithYear[];
}

const El = styled.div`
  width: 75%;
  box-shadow: var(--shadow-right);
  height: 74rem;
  overflow: auto;
`;

const TitleEl = styled.div`
  font-weight: bold;
  font-size: 1.6rem;
  color: var(--black-700);
  margin: 1rem 0;
  padding: 0 2rem;
`;

const RowEl = styled.div`
  display: flex;
  font-size: 1.4rem;
  color: var(--black-700);
  margin: 1rem 0;
  padding: 0 2rem;
  line-height: 2rem;
`;

const FirstColumn = styled.div`
  width: 15rem; 
  flex-shrink: 0;
`;

const HeaderEl = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  font-size: 2rem;
  font-weight: bold;
  border-bottom: 1px solid var(--black-500);
  margin-bottom: 2rem;
`;

const YearSpan = styled.div`
  background-color: var(--black-300);
  padding: 0.3rem;
  margin: 0 0.5rem 0.5rem 0.5rem;
`;

const YearEl = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -0.5rem;
`;

const ButtonEl = styled.div`
  margin: 3rem 0;
  padding: 0 2rem;

`;

export const SourceList = (props: Props) => {
  const {
    indicators,
  } = props;
  const {
    graphType,
    xAxisIndicator,
    yAxisIndicator,
    sizeIndicator,
    colorIndicator,
    updateShowSource,
  } = useContext(Context) as CtxDataType;

  const xIndicatorMetaData = indicators[indicators.findIndex((d) => d.IndicatorLabelTable === xAxisIndicator)];

  const yIndicatorMetaData = indicators[indicators.findIndex((d) => d.IndicatorLabelTable === yAxisIndicator)];

  const sizeIndicatorMetaData = indicators[indicators.findIndex((d) => d.IndicatorLabelTable === sizeIndicator)];

  const colorIndicatorMetaData = colorIndicator === 'Human Development Index' ? indicators[indicators.findIndex((d) => d.IndicatorLabelTable === 'Human development index (HDI)')] : indicators[indicators.findIndex((d) => d.IndicatorLabelTable === colorIndicator)];

  return (
    <El>
      <HeaderEl>
        <div>Data Sources</div>
        <Button type='primary' onClick={() => { updateShowSource(false); }}>Close</Button>
      </HeaderEl>
      <TitleEl>{xIndicatorMetaData.IndicatorLabelTable}</TitleEl>
      <RowEl>
        <FirstColumn>Description</FirstColumn>
        <div>{xIndicatorMetaData.IndicatorDescription}</div>
      </RowEl>
      <RowEl>
        <FirstColumn>Years Available</FirstColumn>
        <YearEl>{xIndicatorMetaData.years.map((d) => <YearSpan>{d}</YearSpan>)}</YearEl>
      </RowEl>
      <RowEl>
        <FirstColumn>Data By</FirstColumn>
        <div>{xIndicatorMetaData.DataSourceName}</div>
      </RowEl>
      <RowEl>
        <FirstColumn>Data Link</FirstColumn>
        {
          xIndicatorMetaData.DataSourceLink !== ''
            ? (
              <div>
                {
                xIndicatorMetaData.DataSourceLink.split(';').map((d) => (
                  <div>
                    <a href={d} target='_blank' rel='noreferrer'>
                      {d}
                    </a>
                  </div>
                ))
              }
              </div>
            )
            : <div />
        }
      </RowEl>
      {
        graphType !== 'barGraph' && yIndicatorMetaData ? (
          <>
            <hr />
            <TitleEl>{yIndicatorMetaData.IndicatorLabelTable}</TitleEl>
            <RowEl>
              <FirstColumn>Description</FirstColumn>
              <div>{yIndicatorMetaData.IndicatorDescription}</div>
            </RowEl>
            <RowEl>
              <FirstColumn>Years Available</FirstColumn>
              <YearEl>{yIndicatorMetaData.years.map((d) => <YearSpan>{d}</YearSpan>)}</YearEl>
            </RowEl>
            <RowEl>
              <FirstColumn>Data By</FirstColumn>
              <div>{yIndicatorMetaData.DataSourceName}</div>
            </RowEl>
            <RowEl>
              <FirstColumn>Data Link</FirstColumn>
              {
                yIndicatorMetaData.DataSourceLink !== ''
                  ? (
                    <div>
                      <a href={yIndicatorMetaData.DataSourceLink} target='_blank' rel='noreferrer'>
                        {yIndicatorMetaData.DataSourceLink}
                      </a>
                    </div>
                  )
                  : <div />
              }
            </RowEl>
          </>
        ) : null
      }
      {
        graphType !== 'map' && colorIndicatorMetaData ? (
          <>
            <hr />
            <TitleEl>{colorIndicatorMetaData.IndicatorLabelTable}</TitleEl>
            <RowEl>
              <FirstColumn>Description</FirstColumn>
              <div>{colorIndicatorMetaData.IndicatorDescription}</div>
            </RowEl>
            <RowEl>
              <FirstColumn>Years Available</FirstColumn>
              <YearEl>{colorIndicatorMetaData.years.map((d) => <YearSpan>{d}</YearSpan>)}</YearEl>
            </RowEl>
            <RowEl>
              <FirstColumn>Data By</FirstColumn>
              <div>{colorIndicatorMetaData.DataSourceName}</div>
            </RowEl>
            <RowEl>
              <FirstColumn>Data Link</FirstColumn>
              {
                colorIndicatorMetaData.DataSourceLink !== ''
                  ? (
                    <div>
                      <a href={colorIndicatorMetaData.DataSourceLink} target='_blank' rel='noreferrer'>
                        {colorIndicatorMetaData.DataSourceLink}
                      </a>
                    </div>
                  )
                  : <div />
              }
            </RowEl>
          </>
        ) : null
      }
      {
        (graphType === 'scatterPlot' || graphType === 'map') && sizeIndicatorMetaData ? (
          <>
            <hr />
            <TitleEl>{sizeIndicatorMetaData.IndicatorLabelTable}</TitleEl>
            <RowEl>
              <FirstColumn>Description</FirstColumn>
              <div>{sizeIndicatorMetaData.IndicatorDescription}</div>
            </RowEl>
            <RowEl>
              <FirstColumn>Years Available</FirstColumn>
              <YearEl>{sizeIndicatorMetaData.years.map((d) => <YearSpan>{d}</YearSpan>)}</YearEl>
            </RowEl>
            <RowEl>
              <FirstColumn>Data By</FirstColumn>
              <div>{sizeIndicatorMetaData.DataSourceName}</div>
            </RowEl>
            <RowEl>
              <FirstColumn>Data Link</FirstColumn>
              {
                sizeIndicatorMetaData.DataSourceLink !== ''
                  ? (
                    <div>
                      <a href={sizeIndicatorMetaData.DataSourceLink} target='_blank' rel='noreferrer'>
                        {sizeIndicatorMetaData.DataSourceLink}
                      </a>
                    </div>
                  )
                  : <div />
              }
            </RowEl>
          </>
        ) : null
      }
      <hr />
      <ButtonEl>
        <Button type='primary' onClick={() => { updateShowSource(false); }}>Close</Button>
      </ButtonEl>
    </El>
  );
};
