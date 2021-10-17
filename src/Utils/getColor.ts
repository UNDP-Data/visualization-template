import { scaleLinear } from 'd3-scale';
import { DataType, OptionsDataType } from '../Types';
import { CONTINENTS_COLOR, COLOR_SCALE } from '../Constants';
import CategoricalData from '../Data/CategoricalData.json';

export const getColor = (d: DataType, colorMetric: OptionsDataType, range: number[] | null) => {
  let color = '#5DA1FC';
  if (colorMetric.Indicator !== 'Not Selected') {
    if (colorMetric.Indicator === 'Continents') {
      color = CONTINENTS_COLOR[d['Group 1'] as 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania' | 'Null'];
    } else {
      const index = d.Indicators.findIndex((el) => el.Indicator === colorMetric.Indicator);
      if (index < 0) {
        color = '#A0A4A8';
      } else {
        if (colorMetric.Categorical && colorMetric.Indicator !== 'Continents') {
          switch (CategoricalData[CategoricalData.findIndex((el) => el.indicator === colorMetric.Indicator)].range.length) {
            case 5:
              color = COLOR_SCALE.Categorical['5Values'][Math.floor(d.Indicators[index].Value) - 1];
              break;
            case 7:
              color = COLOR_SCALE.Categorical['7Values'][Math.floor(d.Indicators[index].Value) - 1];
              break;
            case 10:
              color = COLOR_SCALE.Categorical['10Values'][Math.floor(d.Indicators[index].Value) - 1];
              break;
            default:
              color = COLOR_SCALE.Categorical['10Values'][Math.floor(d.Indicators[index].Value) - 1];
              break;
          }
        }
        if (!colorMetric.Categorical && range) {
          const colorDomain = range[0] >= 0 ? range : [range[0], 0, range[1]];
          const colorScale = scaleLinear().domain(colorDomain as any).range(range[0] >= 0 ? COLOR_SCALE.Linear.Continuous as any : COLOR_SCALE.Linear.Divergent);
          color = colorScale(d.Indicators[index].Value) as any;
        }
      }
    }
  }
  return color;
};
