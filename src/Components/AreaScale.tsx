import styled from 'styled-components';
import { OptionsDataType } from '../Types';

interface Props {
  sizeMetric: OptionsDataType;
  maxValue: number;
}

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--navy);
  width: 17rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 1rem;
`;

const KeyEl = styled.div`
  background-color: var(--white);
  padding: 0.5rem 1rem;
  margin:0 1rem 0 2rem;
  width: fit-content;
`;

export const AreaScale = (props: Props) => {
  const {
    sizeMetric,
    maxValue,
  } = props;
  return (
    <KeyEl>
      <Title>{ sizeMetric.Indicator }</Title>
      <svg width='105' height='56' viewBox='0 0 105 56' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <text fontSize={12} fontWeight={700} textAnchor='middle' fill='#110848' x={4} y={55}>0</text>
        <text fontSize={12} fontWeight={700} textAnchor='middle' fill='#110848' x={85} y={55}>{maxValue}</text>
        <path d='M4 19.5L84 0V40L4 19.5Z' fill='#E9ECF6' />
        <circle cx='85' cy='20' r='19' fill='white' stroke='#110848' strokeWidth='2' />
      </svg>
    </KeyEl>
  );
};
