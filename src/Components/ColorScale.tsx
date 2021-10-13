import React from 'react';
import styled from 'styled-components';
import { OptionsDataType } from '../Types';
import { COLOR_SCALE, CONTINENTS_COLOR, CONTINENTS } from '../Constants';
import CategoricalData from '../Data/CategoricalData.json';

interface Props {
  colorMetric: OptionsDataType;
  colorDomain: number[];
}

interface ColorKeyElProps { 
  flex?: boolean;
}

const ColorKeyEl = styled.div<ColorKeyElProps>`
  margin: ${props => props.flex ? '0 1rem' : '0' };
  font-size: 1.2rem;
  color: var(--navy);
  display: ${props => props.flex ? 'flex' : 'inline' };
  align-items: center;
  width: fit-content;
  justify-content: flex-start;
`;

interface ColorKeySquareProps {
  fill: string;
}

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--navy);
  margin-bottom: 1rem;
`;

const KeyEl = styled.div`
  border: 1px solid #E9ECF6;
  background-color: var(--white);
  border-radius: 0.8rem;
  padding: 0.5rem 1rem;
`;

const ColorKeyContainer = styled.div`
  display: flex;
`;

const ColorKeySquare = styled.div<ColorKeySquareProps>`
  width: 1.8rem;
  height: 1.8rem;
  background-color: ${props => props.fill};
  margin-right: 0.5rem;
`;

const ColorKeyRect = styled.div<ColorKeySquareProps>`
  width: 4rem;
  height: 1rem;
  background-color: ${props => props.fill};
`;

interface ColorKeyContProps {
  colors: string[];
}
interface ColorKeyContDivergentProps {
  colors: string[];
  zeroPercent: number;
}

const ColorKeyCont  = styled.div<ColorKeyContProps>`
  width: 20rem;
  height: 1rem;
  background-image: ${props => `linear-gradient(90deg, ${props.colors[0]}, ${props.colors[1]})`};
`;
const ColorKeyContDivergent  = styled.div<ColorKeyContDivergentProps>`
  width: 20rem;
  height: 1rem;
  background-image: ${props => `linear-gradient(90deg, ${props.colors[0]}, ${props.colors[1]} ${props.zeroPercent}%, ${props.colors[2]})`};
`;

const KeyValue = styled.div`
  text-align: center;
`;

const  ColorKeyValueCont = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
`;

export const ColorScale = (props: Props) => {
  const  { 
    colorMetric,
    colorDomain
  } =  props;
  const rangeLength = CategoricalData.findIndex(d => d.indicator === colorMetric.Indicator) === -1 ? 0 : CategoricalData[CategoricalData.findIndex(d => d.indicator === colorMetric.Indicator)].range.length;
  return <KeyEl>
    <Title>{ colorMetric.Indicator }</Title>
    <ColorKeyContainer>
      {
        colorMetric.Indicator === 'Continents' ? CONTINENTS.map((d: any, i: number) => 
          <ColorKeyEl 
            key={i}    
            flex={true}
          >
            <ColorKeySquare
              fill={CONTINENTS_COLOR[d as 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania' | 'Null']} 
            />
            <div>
              {d}
            </div>
          </ColorKeyEl>
        ) : colorMetric.Categorical ? 
          <>
            {
              CategoricalData[CategoricalData.findIndex(d => d.indicator === colorMetric.Indicator)].range.map((d,i) => 
                <ColorKeyEl key={i}>
                  <ColorKeyRect
                    fill={COLOR_SCALE.Categorical[rangeLength === 5 ? '5Values' : rangeLength === 7 ? '7Values' : '10Values'][d - 1]} 
                  />
                  <KeyValue>
                    {d}
                  </KeyValue>
                </ColorKeyEl>
              )
            }
            <ColorKeyEl style={{marginLeft: '1.5rem'}}>
              <ColorKeyRect
                fill={'#A0A4A8'} 
              />
              <KeyValue>
                NA
              </KeyValue>
            </ColorKeyEl>
          </>
          : colorDomain[0] < 0 ? 
            <>
              <div>
                <ColorKeyContDivergent 
                  colors={COLOR_SCALE.Linear.Divergent}
                  zeroPercent = {-1 * colorDomain[0] * 100 / ( colorDomain[1] - colorDomain[0])}
                />
                <ColorKeyValueCont>
                  <div>{colorDomain[0]}</div>
                  <div>{colorDomain[1]}</div>
                </ColorKeyValueCont>
              </div>
              <ColorKeyEl style={{marginLeft: '1.5rem'}}>
                <ColorKeyRect
                  fill={'#A0A4A8'} 
                />
                <KeyValue>
                  NA
                </KeyValue>
              </ColorKeyEl>
            </> : 
            <>
              <div>
                <ColorKeyCont 
                  colors={COLOR_SCALE.Linear.Continuous}
                />
                <ColorKeyValueCont>
                  <div>{colorDomain[0]}</div>
                  <div>{colorDomain[1]}</div>
                </ColorKeyValueCont>
              </div>
              <ColorKeyEl style={{marginLeft: '1.5rem'}}>
                <ColorKeyRect
                  fill={'#A0A4A8'} 
                />
                <KeyValue>
                  NA
                </KeyValue>
              </ColorKeyEl>
            </>
      }
    </ColorKeyContainer>
  </KeyEl>;
};