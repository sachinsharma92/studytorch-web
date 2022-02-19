import * as APIS from '../../constants/apis';

export const createCollection =
  (payload: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .post(APIS.COLLECITONS, payload)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const updateCollection =
  (id: number, payload: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .put(`${APIS.COLLECITONS}/${id}`, payload)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const deleteCollection =
  (id: number, payload: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .delete(`${APIS.COLLECITONS}/${id}`, { data: payload })
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const fetchCollection =
  (id: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .get(`${APIS.COLLECITONS}/${id}`)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const fetchSharedCollections =
  (): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .get(`${APIS.SHARED_COLLECITONS}`)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const fetchSharedCollection =
  (id: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .get(`${APIS.SHARED_COLLECITONS}/${id}`)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };