import { useContext } from 'react';
import styled from 'styled-components';
import { CtxDataType, DataType, IndicatorMetaDataWithYear } from '../Types';
import Context from '../Context/Context';
import { DataSourceListItem } from '../Components/DataSourceListItem';

interface Props {
  indicators: IndicatorMetaDataWithYear[];
  data: DataType[];
}

const El = styled.div`
  width: 75%;
  box-shadow: var(--shadow-right);
  height: 74rem;
  overflow: auto;
`;

const HeaderEl = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  font-size: 2rem;
  font-weight: bold;
  background-color: var(--white);
  border-bottom: 1px solid var(--black-400);
  margin-bottom: 2rem;
  position: sticky;
  box-shadow: var(--shadow-bottom);
  top: 0;
`;

const HR = styled.hr`
  margin: 0 2rem 2rem 2rem;
  border: 1px solid var(--black-400);
`;

export const DataSources = (props: Props) => {
  const {
    indicators,
    data,
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
        <div>
          Data Description
        </div>
        <button className='primary' type='button' onClick={() => { updateShowSource(false); }}>Close</button>
      </HeaderEl>
      <DataSourceListItem
        indicatorData={xIndicatorMetaData}
        data={data}
      />
      {
        graphType !== 'barGraph' && yIndicatorMetaData ? (
          <>
            <HR />
            <DataSourceListItem
              indicatorData={yIndicatorMetaData}
              data={data}
            />
          </>
        ) : null
      }
      {
        graphType !== 'map' && colorIndicatorMetaData ? (
          <>
            <HR />
            <DataSourceListItem
              indicatorData={colorIndicatorMetaData}
              data={data}
            />
          </>
        ) : null
      }
      {
        (graphType === 'scatterPlot' || graphType === 'map') && sizeIndicatorMetaData ? (
          <>
            <HR />
            <DataSourceListItem
              indicatorData={sizeIndicatorMetaData}
              data={data}
            />
          </>
        ) : null
      }
    </El>
  );
};
