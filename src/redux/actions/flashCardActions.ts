import * as APIS from '../../constants/apis';

export const createFlashCard =
  (payload: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .post(APIS.FLASH_CARD, payload)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const updateFlashCard =
  (id: number, payload: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .put(`${APIS.FLASH_CARD}/${id}`, payload)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const deleteFlashCard =
  (id: number, parent_id: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .delete(`${APIS.FLASH_CARD}/${id}`, { data: { parent_id } })
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };
