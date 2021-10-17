import styled from 'styled-components';
import { HoverDataType } from '../Types';
import { HorizontalArrow, VerticalArrow } from '../Icons';

interface Props {
  data: HoverDataType;
}

interface TooltipElProps {
  x: number;
  y: number;
}

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

const TooltipTitle = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--navy);  
  background: var(--yellow);
  width: 100%;
  box-sizing: border-box;
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
`;

const RowTitleEl = styled.div`
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 1.2rem;
  margin-bottom: 0.6rem;
  color: var(--navy);
`;

const RowMetaData = styled.div`
  font-weight: 400;
  font-size: 1.2rem;
  line-height: 1.2rem;
  margin-bottom: 0.6rem;
  color: var(--navy);
  opacity: 0.5;
`;

const RowValue = styled.div`
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 2rem;
  color: var(--navy);
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
  width: 1.6rem;
  height: 1.6rem;
  margin: 0 0.2rem;
  background-color: ${(props) => (props.fill ? props.fill : 'var(--yellow)')};
`;

const SizeIcon = styled.div`
  width: 1.4rem;
  height: 1.4rem;
  margin: 0 0.2rem;
  border-radius: 1.4rem;
  border: 2px solid var(--navy);
`;

const IconDiv = styled.div`
  margin-right: 0.5rem;
  margin-top: 0.5rem;
`;

export const HoverTooltip = (props: Props) => {
  const {
    data,
  } = props;
  return (
    <TooltipEl x={data.xPosition} y={data.yPosition}>
      <TooltipHead>
        <TooltipTitle>
          {data.country}
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
            <IconDiv>
              {
                d.type === 'x-axis' ? <HorizontalArrow size={20} />
                  : d.type === 'y-axis' ? <VerticalArrow size={20} />
                    : d.type === 'color' ? <ColorIcon fill={d.color} />
                      : d.type === 'size' ? <SizeIcon />
                        : null
              }
            </IconDiv>
            <div>
              <RowMetaData>{d.metaData}</RowMetaData>
              <RowTitleEl>{d.title}</RowTitleEl>
              <RowValue>{d.value}</RowValue>
            </div>
          </RowEl>
        ))
      }
      </TooltipBody>
    </TooltipEl>
  );
};
