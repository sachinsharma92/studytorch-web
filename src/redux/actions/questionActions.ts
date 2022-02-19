import * as APIS from '../../constants/apis';

export const createQuestion =
  (payload: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .post(APIS.QUESTION, payload)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const updateQuestion =
  (id: number, payload: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .put(`${APIS.QUESTION}/${id}`, payload)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const deleteQuestion =
  (id: number, parent_id: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .delete(`${APIS.QUESTION}/${id}`, { data: { parent_id } })
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };
