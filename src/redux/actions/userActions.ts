import get from "lodash/get";
import * as APIS from "../../constants/apis";
import { USER_LOGGED_IN } from "../../constants/actions";

export const login =
  (payload: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .post(APIS.LOGIN, payload)
      .then((user: any) => {
        api.defaults.headers.common["authorization"] = `Bearer ${get(
          user,
          "token"
        )}`;
        dispatch({
          type: USER_LOGGED_IN,
          payload: user,
        });
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const logout =
  (): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    api.defaults.headers.common["authorization"] = null;
  };

export const register =
  (payload: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .post(APIS.REGISTER, payload)
      .then((user: any) => {
        api.defaults.headers.common["authorization"] = `Bearer ${get(
          user,
          "token"
        )}`;
        dispatch({
          type: USER_LOGGED_IN,
          payload: { ...user, showOnBoarding: true },
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

export const fetchTimeZones =
  (): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .get(APIS.TIME_ZONES)
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

export const updateUserProfile =
  (payload: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .put(APIS.PROFILE, payload)
      .then((user: any) => {
        api.defaults.headers.common["authorization"] = `Bearer ${get(
          user,
          "token"
        )}`;
        dispatch({
          type: USER_LOGGED_IN,
          payload: user,
        });
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const updateUserNotification =
  (payload: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .post(APIS.USER_NOTIFICATION, payload)
      .then((user: any) => {
        api.defaults.headers.common["authorization"] = `Bearer ${get(
          user,
          "token"
        )}`;
        dispatch({
          type: USER_LOGGED_IN,
          payload: user,
        });
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const changePassword =
  (payload: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .put(APIS.CHANGE_PASSWORD, payload)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const deleteUser =
  (): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .delete(APIS.DELETE_USER)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const cancelInvitation =
  (uuid: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .delete(`${APIS.CANCEL_INVITATION}/${uuid}`)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };
