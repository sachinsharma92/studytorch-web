import * as APIS from "../../constants/apis";
import { replaceMultiple } from "../../utilities/helpers";

export const createNote =
  (payload: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .post(APIS.NOTES, payload)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const updateNote =
  (id: number, payload: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .put(`${APIS.NOTES}/${id}`, payload)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const archiveNote =
  (id: number, payload: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .put(`${APIS.NOTES}/${id}/archive`, payload)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const fetchArchiveNote =
  (): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .get(`${APIS.NOTES}/archive`)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const duplicateNote =
  (uuid: any, payload: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .post(replaceMultiple(APIS.DUPLICATE_NOTE, { ":id": uuid }), payload)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const deleteNote =
  (id: number, parent_id: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .delete(`${APIS.NOTES}/${id}`, { data: { parent_id } })
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const fetchNoteDetails =
  (id: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .get(`${APIS.NOTES}/${id}`)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };
