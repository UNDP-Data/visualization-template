import { useEffect, useRef, useState } from 'react';
import { scaleLinear, scaleQuantile, scaleThreshold } from 'd3-scale';
import { select } from 'd3-selection';
import styled from 'styled-components';
import domtoimage from 'dom-to-image';
import { geoEqualEarth } from 'd3-geo';
import { zoom } from 'd3-zoom';
import world from '../Data/world.json';
import { HoverTooltip } from '../Components/HoverTooltip';
import { getRange } from '../Utils/getRange';
import { COLOR_SCALE } from '../Constants';
import {
  DataType, HoverDataType, HoverRowDataType, OptionsDataType,
} from '../Types';
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
  selectedCountries: string[];
  selectedIncomeGroups: string[];
}

interface FlexDivProps {
  marginTop: string;
  padding: string;
}

const FlexDiv = styled.div<FlexDivProps>`
  display: flex;
  margin-top: ${(props) => props.marginTop};
  margin-left: 2rem;
  padding: ${(props) => props.padding};
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 0.2rem;
  box-shadow: 0 0 1rem rgb(0 0 0 / 10%);
  z-index: 10;
  position: absolute;
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
    selectedCountries,
    selectedIncomeGroups,
  } = props;

  const width = 1280;
  const height = 720;

  const [hoverInfo, setHoverInfo] = useState<HoverDataType | null>(null);
  const GraphRef = useRef(null);
  const map: any = world;
  const lowerOpacity = 0.1;
  const projection = geoEqualEarth().rotate([0, 0]).scale(265).translate([610, 380]);
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

  const dataFiltered = secondMetric.Indicator !== 'Not Selected'
    ? data.filter((d) => d.IndicatorList.indexOf(firstMetric.Indicator) !== -1 && d.IndicatorList.indexOf(secondMetric.Indicator) !== -1)
    : data.filter((d) => d.IndicatorList.indexOf(firstMetric.Indicator) !== -1);

  const dataFilteredBySize = sizeMetric.Indicator !== 'Not Selected'
    ? data.filter((d) => d.IndicatorList.indexOf(sizeMetric.Indicator) !== -1)
    : undefined;

  const radiusScale = sizeMetric.Indicator !== 'Not Selected' && dataFilteredBySize ? scaleLinear().domain(getRange(dataFilteredBySize, sizeMetric.Indicator)).range([0, 20]) : undefined;

  /*
  const xColorScale = !firstMetric.Categorical ? scaleQuantize().domain(getRange(dataFiltered, firstMetric.Indicator, true)).range([0,1,2,3,4]) : scaleQuantile().domain(CategoricalData[CategoricalData.findIndex(el => el.indicator === firstMetric.Indicator)].range).range([0,1,2,3,4]) ;
  const yColorScale = !secondMetric.Categorical ? scaleQuantize().domain(getRange(dataFiltered, secondMetric.Indicator, true)).range([0,1,2,3,4]) : scaleQuantile().domain(CategoricalData[CategoricalData.findIndex(el => el.indicator === secondMetric.Indicator)].range).range([0,1,2,3,4]) ;
  */
  const xColorScaleQuantile = !firstMetric.Categorical
    ? scaleQuantile().domain(dataFiltered.map((d) => d.Indicators[d.Indicators.findIndex((el) => el.Indicator === firstMetric.Indicator)].Value)).range([0, 1, 2, 3, 4])
    : CategoricalData[CategoricalData.findIndex((el) => el.indicator === firstMetric.Indicator)].range.length === 5
      ? scaleQuantile().domain(CategoricalData[CategoricalData.findIndex((el) => el.indicator === firstMetric.Indicator)].range).range([0, 1, 2, 3, 4])
      : CategoricalData[CategoricalData.findIndex((el) => el.indicator === firstMetric.Indicator)].range.length === 7
        ? scaleThreshold().domain([2, 3, 4, 5]).range([0, 1, 2, 3, 4])
        : scaleThreshold().domain([3, 5, 7, 9]).range([0, 1, 2, 3, 4]);
  const yColorScaleQuantile = !secondMetric.Categorical
    ? secondMetric.Indicator !== 'Not Selected'
      ? scaleQuantile().domain(dataFiltered.map((d) => d.Indicators[d.Indicators.findIndex((el) => el.Indicator === secondMetric.Indicator)].Value)).range([0, 1, 2, 3, 4])
      : null
    : CategoricalData[CategoricalData.findIndex((el) => el.indicator === secondMetric.Indicator)].range.length === 5
      ? scaleQuantile().domain(CategoricalData[CategoricalData.findIndex((el) => el.indicator === secondMetric.Indicator)].range).range([0, 1, 2, 3, 4])
      : CategoricalData[CategoricalData.findIndex((el) => el.indicator === secondMetric.Indicator)].range.length === 7
        ? scaleThreshold().domain([2, 3, 4, 5]).range([0, 1, 2, 3, 4])
        : scaleThreshold().domain([3, 5, 7, 9]).range([0, 1, 2, 3, 4]);
  const xColorScaleDomain = !firstMetric.Categorical
    ? scaleQuantile().domain(dataFiltered.map((d) => d.Indicators[d.Indicators.findIndex((el) => el.Indicator === firstMetric.Indicator)].Value)).range([0, 1, 2, 3, 4]).quantiles()
    : CategoricalData[CategoricalData.findIndex((el) => el.indicator === firstMetric.Indicator)].range.length === 5
      ? [1, 2, 3, 4, 5]
      : CategoricalData[CategoricalData.findIndex((el) => el.indicator === firstMetric.Indicator)].range.length === 7
        ? ['1', '2', '3', '4', '5+']
        : ['1,2', '3,4', '5,6', '7,8', '9,10'];
  const yColorScaleDomain = !secondMetric.Categorical
    ? secondMetric.Indicator !== 'Not Selected'
      ? scaleQuantile().domain(dataFiltered.map((d) => d.Indicators[d.Indicators.findIndex((el) => el.Indicator === secondMetric.Indicator)].Value)).range([0, 1, 2, 3, 4]).quantiles()
      : null
    : CategoricalData[CategoricalData.findIndex((el) => el.indicator === secondMetric.Indicator)].range.length === 5
      ? [1, 2, 3, 4, 5]
      : CategoricalData[CategoricalData.findIndex((el) => el.indicator === secondMetric.Indicator)].range.length === 7
        ? ['1', '2', '3', '4', '5+']
        : ['1,2', '3,4', '5,6', '7,8', '9,10'];

  return (
    <>
      <TopSettings>
        <div style={{ height: '7.2rem' }} />
        <button
          type='button'
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
          }}
        >
          Download Image
        </button>
      </TopSettings>
      <div ref={GraphRef} id='graph-node'>
        <svg style={{ width: '100%' }} viewBox={`0 0 ${width} ${height}`} ref={mapSvg}>
          <g ref={mapG}>
            {
            map.features.map((d: any, i: any) => {
              if (d.properties.NAME === 'Antarctica') return null;
              const index = data.findIndex((el) => el['Alpha-3 code-1'] === d.properties.ISO3);
              const firstindicatorIndex = index !== -1 ? data[index].Indicators.findIndex((el:any) => el.Indicator === firstMetric.Indicator) : -1;
              const secondindicatorIndex = index !== -1 ? data[index].Indicators.findIndex((el:any) => el.Indicator === secondMetric.Indicator) : -1;
              const sizeMetricIndicatorIndex = index !== -1 ? data[index].Indicators.findIndex((el:any) => el.Indicator === sizeMetric.Indicator) : -1;
              const rowData: HoverRowDataType[] = [
                {
                  title: firstMetric.Indicator,
                  value: index !== -1 && firstindicatorIndex !== -1 ? data[index].Indicators[firstindicatorIndex].Value : 'NA',
                  type: 'color',
                  metaData: `${firstMetric['Time period']}, Last Updated: ${firstMetric.Year}`,
                  color: secondMetric.Indicator === 'Not Selected' || !yColorScaleQuantile
                    ? index !== -1
                      ? getColor(data[index], firstMetric, !firstMetric.Categorical ? getRange(data, firstMetric.Indicator, true) : null)
                      : '#A0A4A8'
                    : index !== -1 && firstindicatorIndex !== -1 && secondindicatorIndex !== -1
                      ? COLOR_SCALE.Bivariate[xColorScaleQuantile(data[index].Indicators[firstindicatorIndex].Value)][yColorScaleQuantile(data[index].Indicators[secondindicatorIndex].Value)]
                      : '#A0A4A8',
                },
              ];
              if (secondMetric.Indicator !== 'Not Selected') {
                rowData.push(
                  {
                    title: secondMetric.Indicator,
                    value: index !== -1 && secondindicatorIndex !== -1 ? data[index].Indicators[secondindicatorIndex].Value : 'NA',
                    type: 'color',
                    metaData: `${secondMetric['Time period']}, Last Updated: ${secondMetric.Year}`,
                    color: secondMetric.Indicator === 'Not Selected' || !yColorScaleQuantile
                      ? index !== -1
                        ? getColor(data[index], firstMetric, !firstMetric.Categorical ? getRange(data, firstMetric.Indicator, true) : null)
                        : '#A0A4A8'
                      : index !== -1 && firstindicatorIndex !== -1 && secondindicatorIndex !== -1
                        ? COLOR_SCALE.Bivariate[xColorScaleQuantile(data[index].Indicators[firstindicatorIndex].Value)][yColorScaleQuantile(data[index].Indicators[secondindicatorIndex].Value)]
                        : '#A0A4A8',
                  },
                );
              }
              if (sizeMetric.Indicator !== 'Not Selected') {
                rowData.push(
                  {
                    title: sizeMetric.Indicator,
                    value: index !== -1 && sizeMetricIndicatorIndex !== -1 ? data[index].Indicators[sizeMetricIndicatorIndex].Value : 'NA',
                    type: 'size',
                    metaData: `${sizeMetric['Time period']}, Last Updated: ${sizeMetric.Year}`,
                  },
                );
              }

              const opacityGroup = selectedCountryGroup === 'All' ? 1 : index !== -1 ? data[index][selectedCountryGroup] ? 1 : lowerOpacity : lowerOpacity;
              const countryOpacity = selectedCountries.length === 0 ? 1 : index !== -1 ? selectedCountries.indexOf(data[index]['Country or Area']) !== -1 ? 1 : lowerOpacity : lowerOpacity;
              const opacityRegion = selectedRegion.length === 0 ? 1 : index !== -1 ? selectedRegion.indexOf(data[index]['Group 2']) !== -1 ? 1 : lowerOpacity : lowerOpacity;
              const incomeGroupOpacity = selectedIncomeGroups.length === 0 ? 1 : index !== -1 ? selectedIncomeGroups.indexOf(data[index]['Income group']) !== -1 ? 1 : lowerOpacity : lowerOpacity;
              return (
                <g
                  key={i}
                  opacity={Math.min(opacityGroup, opacityRegion, countryOpacity, incomeGroupOpacity)}
                  onMouseEnter={(event) => {
                    setHoverInfo({
                      country: d.properties.NAME,
                      continent: index !== -1 ? data[index]['Group 1'] : 'NA',
                      rows: rowData,
                      xPosition: event.clientX,
                      yPosition: event.clientY,
                    });
                  }}
                  onMouseMove={(event) => {
                    setHoverInfo({
                      country: d.properties.NAME,
                      continent: index !== -1 ? data[index]['Group 1'] : 'NA',
                      rows: rowData,
                      xPosition: event.clientX,
                      yPosition: event.clientY,
                    });
                  }}
                  onMouseLeave={() => {
                    setHoverInfo(null);
                  }}
                >
                  {
                  d.properties.NAME === 'Antarctica' ? null
                    : d.geometry.type === 'MultiPolygon' ? d.geometry.coordinates.map((el:any, j: any) => {
                      let masterPath = '';
                      el.forEach((geo: number[][]) => {
                        let path = ' M';
                        geo.forEach((c: number[], k: number) => {
                          const point = projection([c[0], c[1]]) as [number, number];
                          if (k !== geo.length - 1) path = `${path}${point[0]} ${point[1]}L`;
                          else path = `${path}${point[0]} ${point[1]}`;
                        });
                        masterPath += path;
                      });
                      return (
                        <path
                          key={j}
                          d={masterPath}
                          className='streetPath'
                          stroke='#fff'
                          strokeWidth={0.25}
                          fill={
                          secondMetric.Indicator === 'Not Selected' || !yColorScaleQuantile
                            ? index !== -1
                              ? getColor(data[index], firstMetric, !firstMetric.Categorical ? getRange(data, firstMetric.Indicator, true) : null)
                              : '#A0A4A8'
                            : index !== -1 && firstindicatorIndex !== -1 && secondindicatorIndex !== -1
                              ? COLOR_SCALE.Bivariate[xColorScaleQuantile(data[index].Indicators[firstindicatorIndex].Value)][yColorScaleQuantile(data[index].Indicators[secondindicatorIndex].Value)]
                              : '#A0A4A8'
                        }
                        />
                      );
                    }) : d.geometry.coordinates.map((el:any, j: number) => {
                      let path = 'M';
                      el.forEach((c: number[], k: number) => {
                        const point = projection([c[0], c[1]]) as [number, number];
                        if (k !== el.length - 1) path = `${path}${point[0]} ${point[1]}L`;
                        else path = `${path}${point[0]} ${point[1]}`;
                      });
                      return (
                        <path
                          key={j}
                          d={path}
                          className='streetPath'
                          stroke='#fff'
                          strokeWidth={0.25}
                          fill={
                          secondMetric.Indicator === 'Not Selected' || !yColorScaleQuantile
                            ? index !== -1
                              ? getColor(data[index], firstMetric, !firstMetric.Categorical ? getRange(data, firstMetric.Indicator, true) : null)
                              : '#A0A4A8'
                            : index !== -1 && firstindicatorIndex !== -1 && secondindicatorIndex !== -1
                              ? COLOR_SCALE.Bivariate[xColorScaleQuantile(data[index].Indicators[firstindicatorIndex].Value)][yColorScaleQuantile(data[index].Indicators[secondindicatorIndex].Value)]
                              : '#A0A4A8'
                        }
                        />
                      );
                    })
                }
                </g>
              );
            })

          }
            {
            sizeMetric.Indicator !== 'Not Selected' && radiusScale && dataFilteredBySize
              ? (
                <g>
                  {
                  dataFilteredBySize.map((d, i) => {
                    const opacityGroup = selectedCountryGroup === 'All' || d[selectedCountryGroup] ? 1 : lowerOpacity;
                    const countryOpacity = selectedCountries.length === 0 ? 1 : selectedCountries.indexOf(d['Country or Area']) !== -1 ? 1 : lowerOpacity;
                    const opacityRegion = selectedRegion.length > 0 ? selectedRegion.indexOf(d['Group 2']) !== -1 ? 1 : lowerOpacity : 1;
                    const incomeGroupOpacity = selectedIncomeGroups.length > 0 ? selectedIncomeGroups.indexOf(d['Income group']) !== -1 ? 1 : lowerOpacity : 1;
                    const coordinates = projection([d['Longitude (average)'], d['Latitude (average)']]) as [number, number];
                    return (
                      <circle
                        key={i}
                        cx={coordinates[0]}
                        cy={coordinates[1]}
                        r={radiusScale(d.Indicators[d.Indicators.findIndex((el: any) => el.Indicator === sizeMetric.Indicator)].Value)}
                        fill='none'
                        strokeWidth={radiusScale(d.Indicators[d.Indicators.findIndex((el: any) => el.Indicator === sizeMetric.Indicator)].Value) > 0 ? 2 : 0}
                        stroke='#110848'
                        opacity={Math.min(opacityGroup, opacityRegion, countryOpacity, incomeGroupOpacity)}
                      />
                    );
                  })
                }
                </g>
              )
              : null
          }
          </g>
        </svg>
        <FlexDiv marginTop={secondMetric.Indicator === 'Not Selected' ? '-10rem' : '-21rem'} padding={secondMetric.Indicator === 'Not Selected' ? '0 1rem' : '0 0 0 1rem'}>
          {
            secondMetric.Indicator === 'Not Selected' || !yColorScaleDomain
              ? (
                <ColorScale
                  colorMetric={firstMetric}
                  colorDomain={!firstMetric.Categorical ? getRange(data, firstMetric.Indicator, true) : [0, 0]}
                />
              )
              : (
                <BivariateColorScale
                  BivariateXTitleText={firstMetric.Indicator}
                  BivariateYTitleText={secondMetric.Indicator}
                  BiVariateXValues={xColorScaleDomain}
                  BiVariateYValues={yColorScaleDomain}
                />
              )
            }
        </FlexDiv>
        {
          hoverInfo
            ? <HoverTooltip data={hoverInfo} />
            : null
        }
      </div>
    </>
  );
};
