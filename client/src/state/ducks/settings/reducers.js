import * as types from './types';

const initState = {
  currentTheme: 'dark'
};

const settings = (state = initState, action) => {
  switch (action.type) {
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
