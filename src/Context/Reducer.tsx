export default (state: any, action: any) => {
  switch (action.type) {
    case 'UPDATE_GRAPH_TYPE':
      return { ...state, graphType: action.payload };
    case 'UPDATE_SELECTED_REGIONS':
      return { ...state, selectedRegions: action.payload };
    case 'UPDATE_YEAR':
      return { ...state, year: action.payload };
    case 'UPDATE_SELECTED_COUNTRIES':
      return { ...state, selectedCountries: action.payload };
    case 'UPDATE_SELECTED_COUNTRY_GROUP':
      return { ...state, selectedCountryGroup: action.payload };
    case 'UPDATE_X_AXIS_INDICATOR':
      return { ...state, xAxisIndicator: action.payload };
    case 'UPDATE_Y_AXIS_INDICATOR':
      return { ...state, yAxisIndicator: action.payload };
    case 'UPDATE_COLOR_INDICATOR':
      return { ...state, colorIndicator: action.payload };
    case 'UPDATE_SIZE_INDICATOR':
      return { ...state, sizeIndicator: action.payload };
    case 'UPDATE_SELECTED_INCOME_GROUPS':
      return { ...state, selectedIncomeGroups: action.payload };
    case 'UPDATE_SHOW_MOST_RECENT_DATA':
      return { ...state, showMostRecentData: action.payload };
    case 'UPDATE_SHOW_LABEL':
      return { ...state, showLabel: action.payload };
    case 'UPDATE_SHOW_SOURCE':
      return { ...state, showSource: action.payload };
    default:
      return { ...state };
  }
};
