import { USER_LOGGED_OUT, USER_LOGGED_IN } from '../../constants/actions';
import get from 'lodash/get';
import axiosInstance from '../../remote/axios';

export interface IUserState {
  accessToken?: any;
  user?: any;
  isLoggedIn: boolean;
}

function initializeState(): IUserState {
  return {
    accessToken: null,
    isLoggedIn: false,
    user: null,
  };
}

export function reduce(
  state: IUserState = initializeState(),
  action: any
): IUserState {
  switch (action.type) {
    case USER_LOGGED_IN:
      return {
        ...state,
        accessToken: get(action, 'payload.token'),
        user: get(action, 'payload'),
        isLoggedIn: true,
      };

    case USER_LOGGED_OUT:
      return initializeState();

    case 'persist/REHYDRATE':
      const token = get(action.payload, 'userState.accessToken', null);
      if (token) {
        axiosInstance.defaults.headers.common[
          'authorization'
        ] = `Bearer ${token}`;
      }
      return state;

    default:
      return state;
  }
}
