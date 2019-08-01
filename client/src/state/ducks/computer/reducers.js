/* REDUCER(S)
It's a good practice to define your state shape first.
Based on the state shape, multiple reducers might be defined in this file, combined and exported into a single reducer function.
*/

import * as types from './types';
import { dbComputers } from './db';

const initState = {
  computers: dbComputers
};

const computer = (state = initState, action) => {
  switch (action.type) {
    case types.SEARCH_COMPUTERS:
      return {
        ...state,
        computers: [...state.computers, ...action.payload.computers].reduce(
          (acc, current) => {
            const x = acc.find(item => item.mac === current.mac);
            if (!x) {
              return acc.concat([current]);
            } else {
              return acc;
            }
          },
          []
        )
        // computers: action.payload.computers
      };

    case types.UPDATE_COMPUTERS_PING:
      // console.log(
      //   action.payload.computers.reduce((a, b) => {
      //     let a1 = state.computers.find(e => e.mac === b.mac) || {};
      //     return a.concat(Object.assign(a1, b));
      //   }, [])
      // );

      // console.log(
      //   action.payload.computers.reduce((a, b) => {
      //     let a1 = state.computers.find(e => e.mac === b.mac) || {};
      //     return a.concat(Object.assign(a1, b));
      //   }, [])
      // );

      // .reduce((a, b) => {
      //   let a1 = state.computers.find(e => e.mac === b.mac) || {};
      //   return a.concat(Object.assign(a1, b));
      // }, [])

      // const macs = new Set([state.computers].map(d => d.mac));

      return {
        ...state,
        computers: action.payload.computers.reduce((a, b) => {
          let a1 = state.computers.find(e => e.mac === b.mac) || {};
          return a.concat(Object.assign(a1, b));
        }, [])
      };

    default:
      return state;
  }
};
const reducer = computer;

export default reducer;
