/* REDUCER(S)
It's a good practice to define your state shape first.
Based on the state shape, multiple reducers might be defined in this file, combined and exported into a single reducer function.
*/

import * as types from './types';

const initState = {
  currentTab: '1',
  currentTheme: 'dark'
};

const settings = (state = initState, action) => {
  switch (action.type) {
    case types.CHANGE_TAB:
      return {
        currentTab: action.payload.tab
      };

    case types.CHANGE_THEME:
      return {
        currentTheme: action.payload.theme
      };

    default:
      return state;
  }
};
const reducer = settings;

export default reducer;
