import styled from 'styled-components';
import { OptionsDataType } from '../Types';
import {
  COLOR_SCALE, CONTINENTS_COLOR, CONTINENTS, INCOME_GROUPS_COLOR, INCOME_GROUPS,
} from '../Constants';
import CategoricalData from '../Data/CategoricalData.json';

interface Props {
  colorMetric: OptionsDataType;
  colorDomain: number[];
}

interface ColorKeyElProps {
  flex?: boolean;
}

const ColorKeyEl = styled.div<ColorKeyElProps>`
  margin: ${(props) => (props.flex ? '0 1rem' : '0')};
  font-size: 1.2rem;
  color: var(--navy);
  display: ${(props) => (props.flex ? 'flex' : 'inline')};
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
  background-color: rgba(255,255,255,0,8);
  padding: 0.5rem 0;
`;

const ColorKeyContainer = styled.div`
  display: flex;
`;

const ColorKeySquare = styled.div<ColorKeySquareProps>`
  width: 1.8rem;
  height: 1.8rem;
  background-color: ${(props) => props.fill};
  margin-right: 0.5rem;
`;

const ColorKeyRect = styled.div<ColorKeySquareProps>`
  width: 4rem;
  height: 1rem;
  background-color: ${(props) => props.fill};
`;

interface ColorKeyContProps {
  colors: string[];
}
interface ColorKeyContDivergentProps {
  colors: string[];
  zeroPercent: number;
}

const ColorKeyCont = styled.div<ColorKeyContProps>`
  width: 20rem;
  height: 1rem;
  background-image: ${(props) => `linear-gradient(90deg, ${props.colors[0]}, ${props.colors[1]})`};
`;
const ColorKeyContDivergent = styled.div<ColorKeyContDivergentProps>`
  width: 20rem;
  height: 1rem;
  background-image: ${(props) => `linear-gradient(90deg, ${props.colors[0]}, ${props.colors[1]} ${props.zeroPercent}%, ${props.colors[2]})`};
`;

const KeyValue = styled.div`
  text-align: center;
`;

const ColorKeyValueCont = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
`;

export const ColorScale = (props: Props) => {
  const {
    colorMetric,
    colorDomain,
  } = props;
  const rangeLength = CategoricalData.findIndex((d) => d.indicator === colorMetric.Indicator) === -1 ? 0 : CategoricalData[CategoricalData.findIndex((d) => d.indicator === colorMetric.Indicator)].range.length;
  return (
    <KeyEl>
      <Title>
        { colorMetric.Indicator }
        {
          colorMetric.Indicator === 'Continents' || colorMetric.Indicator === 'Not Selected' ? null
            : (
              <>
                ,
                {' '}
                {colorMetric.Year ? colorMetric.Year?.split('/')[colorMetric.Year?.split('/').length - 1] : null}
              </>
            )
        }
      </Title>
      <ColorKeyContainer>
        {
        colorMetric.Indicator === 'Continents' ? CONTINENTS.map((d: any, i: number) => (
          <ColorKeyEl
            key={i}
            flex
          >
            <ColorKeySquare
              fill={CONTINENTS_COLOR[d as 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania' | 'Null']}
            />
            <div>
              {d}
            </div>
          </ColorKeyEl>
        ))
          : colorMetric.Indicator === 'Income group' ? INCOME_GROUPS.map((d: any, i: number) => (
            <ColorKeyEl
              key={i}
              flex
            >
              <ColorKeySquare
                fill={INCOME_GROUPS_COLOR[d as 'Low income' | 'Lower middle income' | 'Upper middle income' | 'High income']}
              />
              <div>
                {d}
              </div>
            </ColorKeyEl>
          )) : colorMetric.Categorical
            ? (
              <>
                {
              CategoricalData[CategoricalData.findIndex((d) => d.indicator === colorMetric.Indicator)].range.map((d, i) => (
                <ColorKeyEl key={i}>
                  <ColorKeyRect
                    fill={COLOR_SCALE.Categorical[rangeLength === 5 ? '5Values' : rangeLength === 7 ? '7Values' : '10Values'][d - 1]}
                  />
                  <KeyValue>
                    {d}
                  </KeyValue>
                </ColorKeyEl>
              ))
            }
                <ColorKeyEl style={{ marginLeft: '1.5rem' }}>
                  <ColorKeyRect
                    fill='#A0A4A8'
                  />
                  <KeyValue>
                    NA
                  </KeyValue>
                </ColorKeyEl>
              </>
            )
            : colorDomain[0] < 0
              ? (
                <>
                  <div>
                    <ColorKeyContDivergent
                      colors={COLOR_SCALE.Linear.Divergent}
                      zeroPercent={(-1 * colorDomain[0] * 100) / (colorDomain[1] - colorDomain[0])}
                    />
                    <ColorKeyValueCont>
                      <div>{colorDomain[0]}</div>
                      <div>{colorDomain[1]}</div>
                    </ColorKeyValueCont>
                  </div>
                  <ColorKeyEl style={{ marginLeft: '1.5rem' }}>
                    <ColorKeyRect
                      fill='#A0A4A8'
                    />
                    <KeyValue>
                      NA
                    </KeyValue>
                  </ColorKeyEl>
                </>
              )
              : (
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
                  <ColorKeyEl style={{ marginLeft: '1.5rem' }}>
                    <ColorKeyRect
                      fill='#A0A4A8'
                    />
                    <KeyValue>
                      NA
                    </KeyValue>
                  </ColorKeyEl>
                </>
              )
      }
      </ColorKeyContainer>
    </KeyEl>
  );
};

interface BivariateProps {
  BivariateYTitleText: string;
  BivariateXTitleText: string;
  BiVariateXValues: number[] | string[];
  BiVariateYValues: number[] | string[];
}

const BivariateYTitle = styled.div`
  font-size: 1.2rem;
  line-height: 1.2rem;
  text-align: center;
  position: absolute;
  width: 12rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  transform: translate(-60%) rotate(-90deg);
  padding-left: 1.4rem;
`;

const BivariateXTitle = styled.div`
  font-size: 1.2rem;
  line-height: 1.2rem;
  text-align: center;
  margin-top: 0.5rem;
  padding-left: 1.4rem;
  width: 12rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const KeyContainer = styled.div`    
  position: relative;
  display: inline-flex;
  flex-direction: column;
  margin: 2rem;
  justify-content: flex-start;
`;

const LegendTop = styled.div`
  display: flex;
  align-items: center;
`;

const BivariateYTitleEl = styled.div`
  position: relative;
`;

export const BivariateColorScale = (props: BivariateProps) => {
  const {
    BiVariateXValues,
    BiVariateYValues,
    BivariateYTitleText,
    BivariateXTitleText,
  } = props;
  return (
    <>
      <KeyContainer>
        <LegendTop>
          <BivariateYTitleEl>
            <BivariateYTitle>{BivariateXTitleText}</BivariateYTitle>
          </BivariateYTitleEl>
          <svg width='168' height='132' viewBox='0 0 168 132' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <g>
              <rect x='12' y='96' width='24' height='24' fill='#F2F2F3' />
              <rect x='12' y='72' width='24' height='24' fill='#EEC7D4' />
              <rect x='12' y='48' width='24' height='24' fill='#ECA4BA' />
              <rect x='12' y='24' width='24' height='24' fill='#E789A5' />
              <rect x='12' width='24' height='24' fill='#E26B8D' />
              <rect x='36' y='96' width='24' height='24' fill='#BACEDB' />
              <rect x='36' y='72' width='24' height='24' fill='#B5A9BE' />
              <rect x='36' y='48' width='24' height='24' fill='#B28AA6' />
              <rect x='36' y='24' width='24' height='24' fill='#AE7393' />
              <rect x='36' width='24' height='24' fill='#A9597E' />
              <rect x='60' y='96' width='24' height='24' fill='#83A9C1' />
              <rect x='60' y='72' width='24' height='24' fill='#7D8BA8' />
              <rect x='60' y='48' width='24' height='24' fill='#797193' />
              <rect x='60' y='24' width='24' height='24' fill='#766286' />
              <rect x='60' width='24' height='24' fill='#71486F' />
              <rect x='84' y='96' width='24' height='24' fill='#4F85A9' />
              <rect x='84' y='72' width='24' height='24' fill='#476D93' />
              <rect x='84' y='48' width='24' height='24' fill='#435981' />
              <rect x='84' y='24' width='24' height='24' fill='#3E4972' />
              <rect x='84' width='24' height='24' fill='#3B3861' />
              <rect x='108' y='96' width='24' height='24' fill='#266291' />
              <rect x='147' y='99' width='21' height='21' fill='#A0A4A8' />
              <rect x='108' y='72' width='24' height='24' fill='#1D507E' />
              <rect x='108' y='48' width='24' height='24' fill='#15406E' />
              <rect x='108' y='24' width='24' height='24' fill='#103762' />
              <rect x='108' width='24' height='24' fill='#082753' />
              <text fill='#110848' fontSize='9' x='158' y='129.9' textAnchor='middle'>NA</text>
              <text transform='translate(145 110) rotate(-90)' fill='#110848' fontSize='9' textAnchor='middle'>NA</text>
            </g>
            {
              CategoricalData.findIndex((d) => d.indicator === BivariateYTitleText) !== -1
                ? (
                  <g opacity='1'>
                    <text fill='#110848' fontSize='9' x='24' y='129.9' textAnchor='middle'>{BiVariateYValues[0]}</text>
                    <text fill='#110848' fontSize='9' x='48' y='129.9' textAnchor='middle'>{BiVariateYValues[1]}</text>
                    <text fill='#110848' fontSize='9' x='72' y='129.9' textAnchor='middle'>{BiVariateYValues[2]}</text>
                    <text fill='#110848' fontSize='9' x='96' y='129.9' textAnchor='middle'>{BiVariateYValues[3]}</text>
                    <text fill='#110848' fontSize='9' x='120' y='129.9' textAnchor='middle'>{BiVariateYValues[4]}</text>
                  </g>
                )
                : (
                  <g opacity='1'>
                    <text fill='#110848' fontSize='9' x='36' y='129.9' textAnchor='middle'>{(BiVariateYValues[0] as number).toFixed(1)}</text>
                    <text fill='#110848' fontSize='9' x='60' y='129.9' textAnchor='middle'>{(BiVariateYValues[1] as number).toFixed(1)}</text>
                    <text fill='#110848' fontSize='9' x='84' y='129.9' textAnchor='middle'>{(BiVariateYValues[2] as number).toFixed(1)}</text>
                    <text fill='#110848' fontSize='9' x='108' y='129.9' textAnchor='middle'>{(BiVariateYValues[3] as number).toFixed(1)}</text>
                  </g>
                )
            }
            {
              CategoricalData.findIndex((d) => d.indicator === BivariateXTitleText) !== -1
                ? (
                  <g opacity='1'>
                    <text transform='translate(8 108) rotate(-90)' fill='#110848' fontSize='9' textAnchor='middle'>{BiVariateXValues[0]}</text>
                    <text transform='translate(8 84) rotate(-90)' fill='#110848' fontSize='9' textAnchor='middle'>{BiVariateXValues[1]}</text>
                    <text transform='translate(8 60) rotate(-90)' fill='#110848' fontSize='9' textAnchor='middle'>{BiVariateXValues[2]}</text>
                    <text transform='translate(8 36) rotate(-90)' fill='#110848' fontSize='9' textAnchor='middle'>{BiVariateXValues[3]}</text>
                    <text transform='translate(8 12) rotate(-90)' fill='#110848' fontSize='9' textAnchor='middle'>{BiVariateXValues[4]}</text>
                  </g>
                )
                : (
                  <g opacity='1'>
                    <text transform='translate(8 96) rotate(-90)' fill='#110848' fontSize='9' textAnchor='middle'>{(BiVariateXValues[0] as number).toFixed(1)}</text>
                    <text transform='translate(8 72) rotate(-90)' fill='#110848' fontSize='9' textAnchor='middle'>{(BiVariateXValues[1] as number).toFixed(1)}</text>
                    <text transform='translate(8 48) rotate(-90)' fill='#110848' fontSize='9' textAnchor='middle'>{(BiVariateXValues[2] as number).toFixed(1)}</text>
                    <text transform='translate(8 24) rotate(-90)' fill='#110848' fontSize='9' textAnchor='middle'>{(BiVariateXValues[3] as number).toFixed(1)}</text>
                  </g>
                )
            }
          </svg>
        </LegendTop>
        <BivariateXTitle>{BivariateYTitleText}</BivariateXTitle>
      </KeyContainer>
    </>
  );
};
