import styled from 'styled-components';
import React from 'react';

interface IconElProps {
  height?: number;
}

const IconEl = styled.div<IconElProps>`
  margin: 0 5px;
  height: ${props => props.height ? `${props.height}px` : 'auto'};
`;

const IconElNoMargin = styled.div<IconElProps>`
  margin-top: -0.5rem;
  margin-left: 0.1rem;
  height: ${props => props.height ? `${props.height}px` : 'auto'};
`;

interface IconProps {
  size?: number;
  fill?: string;
  opacity?: number;
}

export const HelpIcon = (props: IconProps) => {
  const { size, fill, opacity } = props;
  return (
    <IconEl height={size}>
      <svg width={size ? size : 16} height={size ? size : 16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" opacity={opacity ? opacity : 1}>
        <path d="M8 2C11.3137 2 14 4.68629 14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2ZM8 3C5.23858 3 3 5.23858 3 8C3 10.7614 5.23858 13 8 13C10.7614 13 13 10.7614 13 8C13 5.23858 10.7614 3 8 3ZM8 10.5C8.41421 10.5 8.75 10.8358 8.75 11.25C8.75 11.6642 8.41421 12 8 12C7.58579 12 7.25 11.6642 7.25 11.25C7.25 10.8358 7.58579 10.5 8 10.5ZM8 4.5C9.10457 4.5 10 5.39543 10 6.5C10 7.23053 9.78822 7.63969 9.24605 8.20791L8.98196 8.47745C8.60451 8.87102 8.5 9.0831 8.5 9.5C8.5 9.77614 8.27614 10 8 10C7.72386 10 7.5 9.77614 7.5 9.5C7.5 8.76947 7.71178 8.36031 8.25395 7.79209L8.51804 7.52255C8.89549 7.12898 9 6.9169 9 6.5C9 5.94772 8.55228 5.5 8 5.5C7.44772 5.5 7 5.94772 7 6.5C7 6.77614 6.77614 7 6.5 7C6.22386 7 6 6.77614 6 6.5C6 5.39543 6.89543 4.5 8 4.5Z" fill={fill ? fill : '#212121'}/>
      </svg>
    </IconEl>
  );
};

export const ScatterPlotIcon = (props: IconProps) => {
  const { size, fill, opacity } = props;
  return (
    <IconEl height={size}>
      <svg width={size ? size : 16} height={size ? size : 16} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" opacity={opacity ? opacity : 1}>
        <path d="M3 2.5C3 2.22386 2.77614 2 2.5 2C2.22386 2 2 2.22386 2 2.5V16V17H3H16.5C16.7761 17 17 16.7761 17 16.5C17 16.2239 16.7761 16 16.5 16H3V2.5Z" fill={fill ? fill : '#212121'}/>
        <path d="M6.5 7C7.88071 7 9 8.11929 9 9.5C9 10.8807 7.88071 12 6.5 12C5.11929 12 4 10.8807 4 9.5C4 8.11929 5.11929 7 6.5 7Z" fill={fill ? fill : '#212121'}/>
        <path d="M12 11C13.1046 11 14 11.8954 14 13C14 14.1046 13.1046 15 12 15C10.8954 15 10 14.1046 10 13C10 11.8954 10.8954 11 12 11Z" fill={fill ? fill : '#212121'}/>
        <path d="M14 3C15.1046 3 16 3.89543 16 5C16 6.10457 15.1046 7 14 7C12.8954 7 12 6.10457 12 5C12 3.89543 12.8954 3 14 3Z" fill={fill ? fill : '#212121'}/>
      </svg>
    </IconEl>
  );
};

export const BarGraphIcon = (props: IconProps) => {
  const { size, fill, opacity } = props;
  return (
    <IconEl height={size}>
      <svg width={size ? size : 16} height={size ? size : 16} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" opacity={opacity ? opacity : 1}>
        <path d="M7 11C7 10.4477 6.55229 10 6 10C5.44771 10 5 10.4477 5 11V16H7V11Z" fill={fill ? fill : '#212121'}/>
        <path d="M11 9C11 8.44772 10.5523 8 10 8C9.44771 8 9 8.44772 9 9V16H11V9Z" fill={fill ? fill : '#212121'}/>
        <path d="M15 6C15 5.44772 14.5523 5 14 5C13.4477 5 13 5.44772 13 6V16H15V6Z" fill={fill ? fill : '#212121'}/>
        <path d="M3 2.5C3 2.22386 2.77614 2 2.5 2C2.22386 2 2 2.22386 2 2.5V16V17H3H16.5C16.7761 17 17 16.7761 17 16.5C17 16.2239 16.7761 16 16.5 16H3V2.5Z" fill={fill ? fill : '#212121'}/>
      </svg>
    </IconEl>
  );
};

export const MapIcon = (props: IconProps) => {
  const { size, fill, opacity } = props;
  return (
    <IconEl height={size}>
      <svg width={size ? size : 16} height={size ? size : 16} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" opacity={opacity ? opacity : 1}>
        <path d="M17.7309 3.05651C17.8963 3.14261 18 3.31356 18 3.5V13.5C18 13.6756 17.9079 13.8384 17.7572 13.9287L12.7572 16.9287C12.604 17.0207 12.4134 17.0239 12.2572 16.9371L7.74616 14.431C7.58395 14.3354 7.41042 14.3367 7.25749 14.4286L7.24282 14.4371L2.74282 16.9371C2.58796 17.0231 2.39913 17.0208 2.24644 16.9309C2.09375 16.8411 2 16.6772 2 16.5V7C2 6.83684 2.07961 6.68395 2.21327 6.59039L7.21327 3.09039C7.38543 2.96987 7.61457 2.96987 7.78673 3.09039L12.5 6.38967L17.2133 3.09039C17.366 2.98347 17.5655 2.97041 17.7309 3.05651ZM3 7.26033V15.6502L6.75049 13.5666C6.83139 13.5187 6.91486 13.4792 7 13.448V4.46033L3 7.26033ZM8.24782 13.5657L12.0036 15.6523L12.0001 7.26041L8 4.46033V13.4491C8.08477 13.4801 8.16769 13.519 8.24782 13.5657ZM13.0036 15.6147L17 13.2169V4.46033L13.0001 7.26025L13.0036 15.6147Z" fill={fill ? fill : '#212121'}/>
      </svg>
    </IconEl>
  );
};

export const Tick = (props: IconProps) => {
  const { size, fill, opacity } = props;
  return (
    <IconElNoMargin height={size}>
      <svg width={size ? size : 16} height={size ? size : 16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" opacity={opacity ? opacity : 1}>
        <path d="M14.6583 5.08646C15.1139 4.60916 15.1139 3.83529 14.6583 3.35798C14.2027 2.88067 13.464 2.88067 13.0084 3.35798L5.66667 11.0493L2.99162 8.24687C2.53601 7.76956 1.79732 7.76956 1.34171 8.24687C0.886097 8.72418 0.886097 9.49805 1.34171 9.97535L4.84171 13.642C5.29732 14.1193 6.03601 14.1193 6.49162 13.642L14.6583 5.08646Z" fill={fill ? fill : '#212121'}/>
      </svg>
    </IconElNoMargin>
  );
};

export const HorizontalArrow = (props: IconProps) => {
  const { size, fill, opacity } = props;
  return (
    <IconElNoMargin height={size}>
      <svg width={size ? size : 16} height={size ? size : 16} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" opacity={opacity ? opacity : 1}>
        <path d="M4.21967 7.46967C4.51256 7.17678 4.98744 7.17678 5.28033 7.46967C5.57322 7.76256 5.57322 8.23744 5.28033 8.53033L4.56066 9.25L8.25 9.25C8.66421 9.25 9 9.58579 9 10C9 10.4142 8.66421 10.75 8.25 10.75L4.56066 10.75L5.28033 11.4697C5.57322 11.7626 5.57322 12.2374 5.28033 12.5303C4.98744 12.8232 4.51256 12.8232 4.21967 12.5303L2.21967 10.5303C1.92678 10.2374 1.92678 9.76256 2.21967 9.46967L4.21967 7.46967ZM11 10C11 9.58579 11.3358 9.25 11.75 9.25L15.4393 9.25L14.7197 8.53033C14.4268 8.23744 14.4268 7.76256 14.7197 7.46967C15.0126 7.17678 15.4874 7.17678 15.7803 7.46967L17.7803 9.46967C18.0732 9.76256 18.0732 10.2374 17.7803 10.5303L15.7803 12.5303C15.4874 12.8232 15.0126 12.8232 14.7197 12.5303C14.4268 12.2374 14.4268 11.7626 14.7197 11.4697L15.4393 10.75L11.75 10.75C11.3358 10.75 11 10.4142 11 10Z" fill={fill ? fill : '#212121'}/>
      </svg>
    </IconElNoMargin>
  );
};

export const VerticalArrow = (props: IconProps) => {
  const { size, fill, opacity } = props;
  return (
    <IconElNoMargin height={size}>
      <svg width={size ? size : 16} height={size ? size : 16} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" opacity={opacity ? opacity : 1}>
        <path d="M12.2803 4.21967C12.5732 4.51256 12.5732 4.98744 12.2803 5.28033C11.9874 5.57322 11.5126 5.57322 11.2197 5.28033L10.5 4.56066V8.25C10.5 8.66421 10.1642 9 9.75 9C9.33579 9 9 8.66421 9 8.25V4.56066L8.28033 5.28033C7.98744 5.57322 7.51256 5.57322 7.21967 5.28033C6.92678 4.98744 6.92678 4.51256 7.21967 4.21967L9.21967 2.21967C9.51256 1.92678 9.98744 1.92678 10.2803 2.21967L12.2803 4.21967ZM9.75 11C10.1642 11 10.5 11.3358 10.5 11.75V15.4393L11.2197 14.7197C11.5126 14.4268 11.9874 14.4268 12.2803 14.7197C12.5732 15.0126 12.5732 15.4874 12.2803 15.7803L10.2803 17.7803C9.98744 18.0732 9.51256 18.0732 9.21967 17.7803L7.21967 15.7803C6.92678 15.4874 6.92678 15.0126 7.21967 14.7197C7.51256 14.4268 7.98744 14.4268 8.28033 14.7197L9 15.4393V11.75C9 11.3358 9.33579 11 9.75 11Z" fill={fill ? fill : '#212121'}/>
      </svg>
    </IconElNoMargin>
  );
};

export const ChevronDown = (props: IconProps) => {
  const { size, fill, opacity } = props;
  return (
    <IconEl height={size}>
      <svg width={size ? size : 16} height={size ? size : 16} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" opacity={opacity ? opacity : 1}>
        <path d="M3.20041 5.73966C3.48226 5.43613 3.95681 5.41856 4.26034 5.70041L8 9.22652L11.7397 5.70041C12.0432 5.41856 12.5177 5.43613 12.7996 5.73966C13.0815 6.0432 13.0639 6.51775 12.7603 6.7996L8.51034 10.7996C8.22258 11.0668 7.77743 11.0668 7.48967 10.7996L3.23966 6.7996C2.93613 6.51775 2.91856 6.0432 3.20041 5.73966Z" fill={fill ? fill : '#212121'}/>
      </svg>
    </IconEl>
  );
};

export const ChevronUp = (props: IconProps) => {
  const { size, fill, opacity } = props;
  return (
    <IconEl height={size}>
      <svg width={size ? size : 16} height={size ? size : 16} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" opacity={opacity ? opacity : 1}>
        <path d="M3.20041 10.2603C3.48226 10.5639 3.95681 10.5814 4.26034 10.2996L8 6.77348L11.7397 10.2996C12.0432 10.5814 12.5177 10.5639 12.7996 10.2603C13.0815 9.95681 13.0639 9.48226 12.7603 9.2004L8.51034 5.2004C8.22258 4.9332 7.77743 4.9332 7.48967 5.2004L3.23966 9.2004C2.93613 9.48226 2.91856 9.95681 3.20041 10.2603Z" fill={fill ? fill : '#212121'}/>
      </svg>
    </IconEl>
  );
};