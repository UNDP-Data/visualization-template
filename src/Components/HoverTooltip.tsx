import React from 'react';
import styled from 'styled-components';
import { HoverDataType } from '../Types';


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
	padding: 1rem 1rem 0 1rem;
	border-radius: 1rem;
	font-size: 1.4rem;
	background-color: var(--white);
  box-shadow: 0px 10px 20px 0px rgb(9 105 250 / 15%);
  word-wrap: break-word;
  top: ${props => props.y + 5}px;
  left: ${props => props.x - 15}px;
`;

const TooltipTitle =  styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--navy);
  margin-bottom: 0.5rem;
`;

const SubNote =  styled.span`
  font-size: 1.2rem;
  color: var(--grey);
  margin-bottom: 0.5rem;
`;

const TooltipBody =  styled.div`
  font-size: 1.3rem;
  color: var(--dark-grey);
  margin-bottom: 1rem;
`;

const HR = styled.hr`
  color:var(--light-grey);
  background-color:var(--light-gray);
`;

const RowEl =  styled.div`
  font-size: 1.3rem;
  color: var(--dark-grey);
  margin: 0.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const RowTitleEl = styled.div`
  margin-right: 1.5rem;
`;

export const HoverTooltip = (props: Props) => {
  const {
    data
  } = props;
  return <TooltipEl x={data.xPosition} y={data.yPosition}>
    <TooltipTitle>
      {data.country} <SubNote>({data.continent})</SubNote>
    </TooltipTitle>
    <HR />
    <TooltipBody>
      {
        data.rows.map((d,i) => 
          <RowEl key={i}>
            <RowTitleEl>{d.title}</RowTitleEl>
            <div className='bold'>{d.value}</div>
          </RowEl>
        )
      }
    </TooltipBody>
  </TooltipEl>;
};