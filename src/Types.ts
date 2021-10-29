export interface IndicatorDataType {
  'Indicator': string;
  'Value': number;
}

export interface DataType {
  'Alpha-2 code': string;
  'Alpha-3 code-1': string;
  'Country or Area': string;
  'Development classification': string;
  'Group 1': string;
  'Group 2': string;
  'Group 3': string;
  'LDC': boolean;
  'LLDC': boolean;
  'Latitude (average)': number;
  'Longitude (average)': number;
  'Numeric code': number;
  'SIDS': boolean;
  'Indicators': IndicatorDataType[];
  'IndicatorList': string[];
  'Income Group': string;
}

export interface IndicatorOptionsDataType {
  'Data source link': string;
  'Data source name': string;
  'Indicator': string;
  'Indicator Description': string;
  'Time period': string;
  'Year': string;
  'Categorical': boolean;
}

export interface OptionsDataType {
  'Data source link': string | null;
  'Data source name': string | null;
  'Indicator Description': string | null;
  'Time period': string | null;
  Year: string | null;
  Indicator: string;
  Categorical: boolean;
}

export interface HoverRowDataType {
  title: string;
  value: number | 'NA';
  type: 'x-axis' | 'y-axis' | 'color' | 'size';
  metaData: string;
  color?:string;
}

export interface HoverDataType {
  country: string;
  continent: string;
  rows: HoverRowDataType[];
  xPosition: number;
  yPosition: number;
}
