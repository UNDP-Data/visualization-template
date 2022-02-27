import styled from 'styled-components';
import { HoverDataType } from '../Types';

interface Props {
  data: HoverDataType;
}

interface TooltipElProps {
  x: number;
  y: number;
}
const TooltipTitle = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--navy);  
  background: var(--yellow);
  width: 100%;
  box-sizing: border-box;
  border-radius: 1rem 1rem 0 0;
  padding: 1.6rem 4rem 1.6rem 2rem;
  position: relative;
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 1.8rem;
`;

const SubNote = styled.span`
  font-size: 1.2rem;
  color: var(--navy);
`;

const TooltipBody = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 2rem;
`;

const RowEl = styled.div`
  font-size: 1.3rem;
  color: var(--dark-grey);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
`;

const RowTitleEl = styled.div`
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 1.6rem;
  color: var(--navy);
  display: flex;
`;

const RowValue = styled.div`
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 2rem;
  color: var(--navy);
  margin-left: 2rem;
`;

const TooltipHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

interface ColorIconProps {
  fill?:string;
}

const ColorIcon = styled.div<ColorIconProps>`
  width: 1rem;
  height: 1rem;
  border-radius: 1rem;
  margin: 0 0.5rem 0 0;
  background-color: ${(props) => (props.fill ? props.fill : 'var(--yellow)')};
`;

const TooltipEl = styled.div<TooltipElProps>`
  display: block;
  position: fixed;
  z-index: 10;
  border-radius: 1rem;
  font-size: 1.4rem;
  background-color: var(--white);
  box-shadow: 0 0 1rem rgb(0 0 0 / 15%);
  word-wrap: break-word;
  top: ${(props) => props.y - 40}px;
  left: ${(props) => props.x + 20}px;
  max-width: 24rem;
`;

const FlexRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  width: 100%;
`;

export const TooltipForMultiLineChart = (props: Props) => {
  const {
    data,
  } = props;
  return (
    <TooltipEl x={data.xPosition} y={data.yPosition}>
      <TooltipHead>
        <TooltipTitle>
          {data.country.substring(0, 50)}
          {data.country.substring(0, 50) === data.country ? '' : '...'}
          {' '}
          <SubNote>
            (
            {data.continent}
            )
          </SubNote>
        </TooltipTitle>
      </TooltipHead>
      <TooltipBody>
        {
          data.rows.map((d, i) => (
            <RowEl key={i}>
              <ColorIcon fill={d.color} />
              <FlexRow>
                <RowTitleEl>
                  {d.title}
                </RowTitleEl>
                <RowValue>{d.value}</RowValue>
              </FlexRow>
            </RowEl>
          ))
        }
      </TooltipBody>
    </TooltipEl>
  );
};
