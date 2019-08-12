import * as types from './types';

const changeTheme = theme => ({
  type: types.CHANGE_THEME,
  payload: {
    theme
  }
});

export { changeTheme };
