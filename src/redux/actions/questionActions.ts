import * as APIS from "../../constants/apis";
import { replaceMultiple } from "../../utilities/helpers";

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

export const archiveQuestion =
  (id: number, payload: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .put(`${APIS.QUESTION}/${id}/archive`, payload)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const fetchArchiveQuestion =
  (): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .get(`${APIS.QUESTION}/archive`)
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

export const duplicateQuestion =
  (uuid: any, payload: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .post(replaceMultiple(APIS.DUPLICATE_QUESTION, { ":id": uuid }), payload)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };
