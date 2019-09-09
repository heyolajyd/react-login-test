import { userConstants } from '../constants';

export function registration(state = {}, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { registering: true, user: action.user };
    case userConstants.REGISTER_SUCCESS:
      return {
        registering: false,
        registered: true,
        user: action.user,
        error: null
      };
    case userConstants.REGISTER_FAILURE:
      return {
        registering: false,
        registered: true,
        user: null,
        error: action.error
      };
    default:
      return state;
  }
}
