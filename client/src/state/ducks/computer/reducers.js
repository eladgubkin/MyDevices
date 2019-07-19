/* REDUCER(S)
It's a good practice to define your state shape first.
Based on the state shape, multiple reducers might be defined in this file, combined and exported into a single reducer function.
*/

import * as types from './types';

const initState = {
  computers: {}
};

const computer = (state = initState, action) => {
  switch (action.type) {
    case types.SEARCH_COMPUTERS:
      return {
        computers: action.payload.computers
      };

    default:
      return state;
  }
};
const reducer = computer;

export default reducer;
