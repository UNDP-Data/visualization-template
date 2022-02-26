import { useContext } from 'react';
import styled from 'styled-components';
import { CtxDataType, DataType, IndicatorMetaDataWithYear } from '../Types';
import {
  ScatterPlotIcon, BarGraphIcon, MapIcon,
} from '../Icons';
import Context from '../Context/Context';
import { Settings } from './Settings';
import { Graph } from './Graph';
import { SourceList } from './SourceList';

interface Props {
  data: DataType[];
  indicators: IndicatorMetaDataWithYear[];
  regions: string[];
  countries: string[];
}

const Container = styled.div`
  max-width: 132rem;
  padding: 0 2rem;
`;

const RootEl = styled.div`
  background-color: var(--white);
  color: var(--black-600);
  box-shadow: var(--shadow);
`;

const TabsContainerEl = styled.div`
  background-color: var(--black-200);
  display: flex;
`;

interface SelectedData {
  selected?: boolean;
}

const TabsEl = styled.div<SelectedData>`
  font-size: 1.2rem;
  padding: 1rem 0;
  min-width: 10rem;
  width: 15%;
  text-transform: uppercase;
  justify-content: center;
  background-color:${(props) => (props.selected ? 'var(--white)' : 'transparent')};
  color:${(props) => (props.selected ? 'var(--primary-blue)' : 'var(--black-600)')};
  text-align: center;
  border-right: 1px solid var(--black-450);
  opacity :${(props) => (props.selected ? 1 : 0.6)};
  cursor: pointer;
  div{
    margin-bottom: 0.5rem;
  }
  &:hover {
    opacity: 1;
  }
`;

const GraphEl = styled.div`
  display: flex;
  align-items: stretch;
`;

export const GrapherComponent = (props: Props) => {
  const {
    data,
    indicators,
    regions,
    countries,
  } = props;
  const {
    graphType,
    showSource,
    updateGraphType,
  } = useContext(Context) as CtxDataType;
  return (
    <Container>
      <h3>Explore Data</h3>
      <RootEl>
        <TabsContainerEl>
          <TabsEl selected={graphType === 'scatterPlot'} onClick={() => { updateGraphType('scatterPlot'); }}>
            <ScatterPlotIcon size={48} fill={graphType === 'scatterPlot' ? 'var(--primary-blue)' : 'var(--black-500)'} />
            <>Correlation</>
          </TabsEl>
          <TabsEl selected={graphType === 'map'} onClick={() => { updateGraphType('map'); }}>
            <MapIcon size={48} fill={graphType === 'map' ? 'var(--primary-blue)' : 'var(--black-500)'} />
            <>Maps</>
          </TabsEl>
          <TabsEl selected={graphType === 'barGraph'} onClick={() => { updateGraphType('barGraph'); }}>
            <BarGraphIcon size={48} fill={graphType === 'barGraph' ? 'var(--primary-blue)' : 'var(--black-500)'} />
            <>Ranks</>
          </TabsEl>
          <TabsEl selected={graphType === 'trendLine'} onClick={() => { updateGraphType('trendLine'); }}>
            <BarGraphIcon size={48} fill={graphType === 'trendLine' ? 'var(--primary-blue)' : 'var(--black-500)'} />
            <>Trends</>
          </TabsEl>
        </TabsContainerEl>
        <GraphEl>
          <Settings
            indicators={indicators}
            regions={regions}
            countries={countries}
          />
          {
            showSource
              ? (
                <SourceList
                  indicators={indicators}
                />
              )
              : (
                <Graph
                  data={data}
                  indicators={indicators}
                  countries={countries}
                />
              )
          }
        </GraphEl>
      </RootEl>
    </Container>
  );
};
