import * as APIS from '../../constants/apis';
import { replaceMultiple, getUrl } from '../../utilities/helpers';

export const createGroup =
  (payload: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .post(APIS.GROUPS, payload)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const updateGroup =
  (id: number, payload: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .put(`${APIS.GROUPS}/${id}`, payload)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const deleteGroup =
  (id: number): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .delete(`${APIS.GROUPS}/${id}`)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const getUserGroups =
  (): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .get(`${APIS.GROUPS}`)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const leaveGroup =
  (id: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .delete(
        replaceMultiple(APIS.LEAVE_GROUP, {
          ':id': id,
        })
      )
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const fetchGroupCollectionDetails =
  (id: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .get(`${APIS.GROUPS}/collections/${id}`)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const fetchGroupDetails =
  (id: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .get(`${APIS.GROUPS}/${id}`)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const getUserForGroup =
  (id: any, query: any = {}): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    console.log(
      id,
      '####',
      replaceMultiple(APIS.USERS_FOR_GROUP, {
        ':id': id,
      })
    );
    const url = getUrl(
      replaceMultiple(APIS.USERS_FOR_GROUP, {
        ':id': id,
      }),
      query
    );
    return api
      .get(url)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };
