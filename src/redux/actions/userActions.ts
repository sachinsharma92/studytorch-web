import get from 'lodash/get';
import * as APIS from '../../constants/apis';
import { USER_LOGGED_IN } from '../../constants/actions';
import { setAccessToken } from '../../remote/axios';

export const login =
  (payload: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .post(APIS.LOGIN, payload)
      .then((user: any) => {
        setAccessToken(api, get(user, 'token'));
        dispatch({
          type: USER_LOGGED_IN,
          payload: user,
        });
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const register =
  (payload: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .post(APIS.REGISTER, payload)
      .then((user: any) => {
        setAccessToken(api, get(user, 'token'));
        dispatch({
          type: USER_LOGGED_IN,
          payload: user,
        });
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const forgotPassword =
  (payload: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .post(APIS.FORGOT_PASSWORD, payload)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const verifyforgotPassword =
  (payload: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .post(APIS.VERIFY_FORGOT_PASSWORD, payload)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const updateforgotPassword =
  (payload: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .put(APIS.FORGOT_PASSWORD, payload)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };
