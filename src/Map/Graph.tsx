import React, { useEffect, useRef, useState } from 'react';
import { DataType, HoverDataType, HoverRowDataType, OptionsDataType } from '../Types';
import { scaleLinear, scaleQuantile } from 'd3-scale';
import { getRange } from '../Utils/getRange';
import { select } from 'd3-selection';
import { HoverTooltip } from '../Components/HoverTooltip';
import styled from 'styled-components';
import domtoimage from 'dom-to-image';
import world from '../Data/world.json';
import { geoEqualEarth } from 'd3-geo';
import { zoom } from 'd3-zoom';
import { BivariateColorForKey, COLOR_SCALE } from '../Constants';
import CategoricalData from '../Data/CategoricalData.json';
import { getColor } from '../Utils/getColor';
import { BivariateColorScale, ColorScale } from '../Components/ColorScale';

interface Props {
  data: DataType[];
  firstMetric: OptionsDataType;
  secondMetric: OptionsDataType;
  sizeMetric: OptionsDataType;
  selectedRegion: string[];
  selectedCountryGroup: 'All' | 'LDC' | 'LLDC' | 'SIDS';
}

const FlexDiv = styled.div`
  display: flex;
`;

const TopSettings = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
`;

export const Graph = (props: Props) => {
  const {
    data,
    firstMetric,
    secondMetric,
    sizeMetric,
    selectedRegion,
    selectedCountryGroup,
  } = props;

  const width = 1280;
  const height = 720;

  const [hoverInfo, setHoverInfo] = useState<HoverDataType | null>(null);
  const GraphRef = useRef(null);
  const map: any = world;
  
  const projection = geoEqualEarth().rotate([0, 0]).scale(225).translate([640,380]);
  const mapSvg = useRef<SVGSVGElement>(null);
  const mapG = useRef<SVGGElement>(null);
  useEffect(() => {
    const mapGSelect = select(mapG.current);
    const mapSvgSelect = select(mapSvg.current);
    const zoomBehaviour = zoom()
      .scaleExtent([1, 3])
      .translateExtent([[0, 0], [width, height]])
      .on('zoom', ({ transform }) => {
        mapGSelect.attr('transform', transform);
      });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mapSvgSelect.call(zoomBehaviour as any);
  }, [height, width]);

  const dataFiltered = secondMetric.Indicator !== 'Not Selected' ?  
    data.filter(d => d.IndicatorList.indexOf(firstMetric.Indicator) !== -1 && d.IndicatorList.indexOf(secondMetric.Indicator) !== -1) : 
    data.filter(d => d.IndicatorList.indexOf(firstMetric.Indicator) !== -1);
  
  const dataFilteredBySize = sizeMetric.Indicator !== 'Not Selected' ?  
    data.filter(d => d.IndicatorList.indexOf(sizeMetric.Indicator) !== -1) : 
    undefined;
  
  const radiusScale = sizeMetric.Indicator !== 'Not Selected' && dataFilteredBySize ?  scaleLinear().domain(getRange(dataFilteredBySize,sizeMetric.Indicator)).range([0,20]) : undefined;

  /*
  const xColorScale = !firstMetric.Categorical ? scaleQuantize().domain(getRange(dataFiltered, firstMetric.Indicator, true)).range([0,1,2,3,4]) : scaleQuantile().domain(CategoricalData[CategoricalData.findIndex(el => el.indicator === firstMetric.Indicator)].range).range([0,1,2,3,4]) ;
  const yColorScale = !secondMetric.Categorical ? scaleQuantize().domain(getRange(dataFiltered, secondMetric.Indicator, true)).range([0,1,2,3,4]) : scaleQuantile().domain(CategoricalData[CategoricalData.findIndex(el => el.indicator === secondMetric.Indicator)].range).range([0,1,2,3,4]) ;
  */
  const xColorScaleQuantile = !firstMetric.Categorical ? scaleQuantile().domain(dataFiltered.map(d => d.Indicators[d.Indicators.findIndex(el => el.Indicator === firstMetric.Indicator)].Value)).range([0,1,2,3,4]) : scaleQuantile().domain(CategoricalData[CategoricalData.findIndex(el => el.indicator === firstMetric.Indicator)].range).range([0,1,2,3,4]) ;
  const yColorScaleQuantile = !secondMetric.Categorical ? scaleQuantile().domain(dataFiltered.map(d => d.Indicators[d.Indicators.findIndex(el => el.Indicator === firstMetric.Indicator)].Value)).range([0,1,2,3,4]) : scaleQuantile().domain(CategoricalData[CategoricalData.findIndex(el => el.indicator === secondMetric.Indicator)].range).range([0,1,2,3,4]) ;
  

  return (<>
    <TopSettings> 
      <FlexDiv>
        {
          secondMetric.Indicator === 'Not Selected' ?
            <ColorScale 
              colorMetric = {firstMetric} 
              colorDomain = {!firstMetric.Categorical ? getRange(data,firstMetric.Indicator, true) : [0,0]} 
            />
            : 
            <BivariateColorScale
              colors={BivariateColorForKey}
              BivariateXTitleText={firstMetric.Indicator}
              BivariateYTitleText={secondMetric.Indicator}            
            />
        }
      </FlexDiv>
      <button 
        className='secondary'
        onClick={() => {
          // tslint:disable-next-line: no-floating-promises
          domtoimage
            .toPng(document.getElementById('graph-node') as HTMLElement)
            .then((dataUrl: any) => {
              const link = document.createElement('a');
              link.download = 'map.png';
              link.href = dataUrl;
              link.click();
            });
        }}>Download Image</button>
    </TopSettings>
    <div ref={GraphRef} id="graph-node">
      <svg style={{  width: '100%' }} viewBox={`0 0 ${width} ${height}`} ref={mapSvg}>
        <g ref={mapG}>
          {
            map.features.map((d: any, i: any) => {
              if(d.properties.NAME === 'Antarctica') return null;
              const index = data.findIndex(el => el['Alpha-3 code-1'] === d.properties.ISO3);
              const firstindicatorIndex = index !== -1 ? data[index].Indicators.findIndex((el:any) => el.Indicator === firstMetric.Indicator) : -1;
              const secondindicatorIndex = index !== -1 ? data[index].Indicators.findIndex((el:any) => el.Indicator === secondMetric.Indicator) : -1;
              const sizeMetricIndicatorIndex = index !== -1 ? data[index].Indicators.findIndex((el:any) => el.Indicator === sizeMetric.Indicator) : -1;
              const rowData: HoverRowDataType[] = [
                {
                  title: firstMetric.Indicator,
                  value: index !== -1 && firstindicatorIndex !== -1 ? data[index].Indicators[firstindicatorIndex].Value : 'NA',
                  type: 'color',
                  metaData: `${firstMetric['Time period']}, Last Updated: ${firstMetric.Year}`,
                  color:secondMetric.Indicator === 'Not Selected' ? 
                    index !== -1 ?  
                      getColor(data[index], firstMetric,  !firstMetric.Categorical ?  getRange(data,firstMetric.Indicator, true) : null) :
                      '#A0A4A8' : 
                    index !== -1 && firstindicatorIndex !== -1 && secondindicatorIndex !== -1 ? 
                      COLOR_SCALE.Bivariate[xColorScaleQuantile(data[index].Indicators[firstindicatorIndex].Value)][yColorScaleQuantile(data[index].Indicators[secondindicatorIndex].Value)] : 
                      '#A0A4A8',
                },
              ];
              if(secondMetric.Indicator !== 'Not Selected') {
                rowData.push(
                  {
                    title: secondMetric.Indicator,
                    value: index !== -1 && secondindicatorIndex !== -1 ? data[index].Indicators[secondindicatorIndex].Value : 'NA',
                    type: 'color',
                    metaData: `${secondMetric['Time period']}, Last Updated: ${secondMetric.Year}`,
                    color:secondMetric.Indicator === 'Not Selected' ? 
                      index !== -1 ?  
                        getColor(data[index], firstMetric,  !firstMetric.Categorical ?  getRange(data,firstMetric.Indicator, true) : null) :
                        '#A0A4A8' : 
                      index !== -1 && firstindicatorIndex !== -1 && secondindicatorIndex !== -1 ? 
                        COLOR_SCALE.Bivariate[xColorScaleQuantile(data[index].Indicators[firstindicatorIndex].Value)][yColorScaleQuantile(data[index].Indicators[secondindicatorIndex].Value)] : 
                        '#A0A4A8',
                  }
                );
              }
              if(sizeMetric.Indicator !== 'Not Selected') {
                rowData.push(
                  {
                    title: sizeMetric.Indicator,
                    value: index !== -1 && sizeMetricIndicatorIndex !== -1 ? data[index].Indicators[sizeMetricIndicatorIndex].Value : 'NA',
                    type: 'size',
                    metaData: `${sizeMetric['Time period']}, Last Updated: ${sizeMetric.Year}`,
                  }
                );
              }

              const opacityGroup = selectedCountryGroup === 'All' ? 1 : index !== -1 ? data[index][selectedCountryGroup] ? 1: 0.25 : 0.25;
              const opacityRegion = index !== -1 ? selectedRegion.indexOf(data[index]['Group 1']) !== -1 ? 1 : 0.25 : 0.25;
              return <g 
                key={i}
                opacity={Math.min(opacityGroup, opacityRegion)}
                onMouseEnter={(event) => {
                  setHoverInfo({
                    country: d.properties.NAME,
                    continent: index !== - 1 ? data[index]['Group 1'] : 'NA',
                    rows: rowData,
                    xPosition: event.clientX,
                    yPosition: event.clientY,
                  });
                }}
                onMouseMove={(event) => {
                  setHoverInfo({
                    country: d.properties.NAME,
                    continent: index !== - 1 ? data[index]['Group 1'] : 'NA',
                    rows: rowData,
                    xPosition: event.clientX,
                    yPosition: event.clientY,
                  });
                }}
                onMouseLeave={() => {
                  setHoverInfo(null);
                }}> 
                {
                  d.properties.NAME === 'Antarctica' ? null : 
                    d.geometry.type === 'MultiPolygon' ? d.geometry.coordinates.map((el:any , j: any) => {
                      let masterPath = '';
                      el.forEach((geo: number[][]) => {
                        let path = ' M';
                        geo.forEach((c: number[], k: number) => {
                          const point = projection([c[0], c[1]]) as [number, number];
                          if (k !== geo.length - 1)
                            path = path + `${point[0]} ${point[1]}L`;
                          else
                            path = path + `${point[0]} ${point[1]}`;
                        });
                        masterPath = masterPath + path;
                      });
                      return <path
                        key={j}
                        d={masterPath}
                        className={'streetPath'}
                        stroke={'#fff'}
                        strokeWidth={0.25}
                        fill={
                          secondMetric.Indicator === 'Not Selected' ? 
                            index !== -1 ?  
                              getColor(data[index], firstMetric,  !firstMetric.Categorical ?  getRange(data,firstMetric.Indicator, true) : null) :
                              '#A0A4A8' : 
                            index !== -1 && firstindicatorIndex !== -1 && secondindicatorIndex !== -1 ? 
                              COLOR_SCALE.Bivariate[xColorScaleQuantile(data[index].Indicators[firstindicatorIndex].Value)][yColorScaleQuantile(data[index].Indicators[secondindicatorIndex].Value)] : 
                              '#A0A4A8'
                        }
                      />;
                    }) : d.geometry.coordinates.map((el:any , j: any) => {
                      let path = 'M';
                      el.forEach((c: number[], k: number) => {
                        const point = projection([c[0], c[1]]) as [number, number];
                        if (k !== el.length - 1)
                          path = path + `${point[0]} ${point[1]}L`;
                        else
                          path = path + `${point[0]} ${point[1]}`;
                      });
                      return <path
                        key={j}
                        d={path}
                        className={'streetPath'}
                        stroke={'#fff'}
                        strokeWidth={0.25}
                        fill={
                          secondMetric.Indicator === 'Not Selected' ? 
                            index !== -1 ?  
                              getColor(data[index], firstMetric,  !firstMetric.Categorical ?  getRange(data,firstMetric.Indicator, true) : null) :
                              '#A0A4A8' : 
                            index !== -1 && firstindicatorIndex !== -1 && secondindicatorIndex !== -1 ? 
                              COLOR_SCALE.Bivariate[xColorScaleQuantile(data[index].Indicators[firstindicatorIndex].Value)][yColorScaleQuantile(data[index].Indicators[secondindicatorIndex].Value)] : 
                              '#A0A4A8'
                        }
                      />;
                    }) 
                }
              </g>;
            })

          }
          {
            sizeMetric.Indicator !== 'Not Selected' && radiusScale && dataFilteredBySize ? 
              <g>
                {
                  dataFilteredBySize.map((d,i) => {
                    const opacityGroup = selectedCountryGroup === 'All' || d[selectedCountryGroup]  ? 1 : 0.25;
                    const opacityRegion = selectedRegion.indexOf(d['Group 1']) !== -1 ? 1 : 0.25;
                    const coordinates = projection([d['Longitude (average)'], d['Latitude (average)']]) as [number, number];
                    return <circle 
                      key={i}
                      cx={coordinates[0]}
                      cy={coordinates[1]}
                      r={radiusScale(d.Indicators[d.Indicators.findIndex((el: any) => el.Indicator === sizeMetric.Indicator)].Value)}
                      fill={'none'}
                      strokeWidth={radiusScale(d.Indicators[d.Indicators.findIndex((el: any) => el.Indicator === sizeMetric.Indicator)].Value) > 0 ? 2 : 0}
                      stroke={'#110848'}
                      opacity={Math.min(opacityGroup, opacityRegion)}
                    />;
                  })
                }
              </g>
              : null
          }
        </g>
      </svg>
      {
        hoverInfo ? 
          <HoverTooltip data={hoverInfo}/>
          : null
      }
    </div>
  </>
  );
};