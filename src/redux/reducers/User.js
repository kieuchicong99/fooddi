import Types from '../types/Types';
export const userActions = {
  //login
  loginSuccess: user => {
    return {
      type: Types.USER.LOGIN_SUCCESS,
      user,
    };
  },
  loginFailure: error => {
    return {
      type: Types.USER.LOGIN_FAILURE,
      error,
    };
  },

  //profile
  loadProfileSuccess: user => {
    return {
      type: Types.USER.LOAD_PROFILE_SUCCESS,
      user,
    };
  },
  loadProfileFailure: error => {
    return {
      type: Types.USER.LOAD_PROFILE_FAILURE,
      error,
    };
  },

  //pass word
  changePasswordSuccess: json => {
    return {
      type: Types.USER.CHANGE_PASSWORD_SUCCESS,
      json,
    };
  },
  changePasswordFailure: error => {
    return {
      type: Types.USER.CHANGE_PASSWORD_FAILURE,
      error,
    };
  },
};
