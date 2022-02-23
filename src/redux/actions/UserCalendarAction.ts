import * as APIS from '../../constants/apis';
import { getUrl } from '../../utilities/helpers';

export const createUserCalendar =
  (payload: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .post(APIS.USER_CALENDAR, payload)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const updateUserCalendar =
  (id: any, payload: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .put(`${APIS.USER_CALENDAR}/${id}`, payload)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const deleteUserCalendar =
  (id: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .delete(`${APIS.USER_CALENDAR}/${id}`)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const fetchUserCalendar =
  (query: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .get(getUrl(APIS.USER_CALENDAR, query))
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };
