import * as APIS from '../../constants/apis';
import { replaceMultiple } from '../../utilities/helpers';

export const createChecklist =
  (payload: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .post(APIS.CHECKLIST, payload)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const updateChecklist =
  (id: any, payload: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .put(`${APIS.CHECKLIST}/${id}`, payload)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const deleteChecklist =
  (id: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .delete(`${APIS.CHECKLIST}/${id}`)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const createTaskToCheckList =
  (id: any, payload: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .post(
        replaceMultiple(APIS.CHECKLIST_TASK, {
          ':id': id,
        }),
        payload
      )
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const deleteTaskToCheckList =
  (id: any, task_id: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .delete(
        ` ${replaceMultiple(APIS.CHECKLIST_TASK, {
          ':id': id,
        })}/${task_id}`
      )
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const updateTaskStatusToCheckList =
  (id: any, task_id: any, payload: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .put(
        `${replaceMultiple(APIS.CHECKLIST_TASK, {
          ':id': id,
        })}/${task_id}`,
        payload
      )
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const fetchUserChecklist =
  (): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .get(APIS.CHECKLIST)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const archiveChecklist =
  (id: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .put(
        replaceMultiple(APIS.ARCHIVE_CHECKLIST_TASK, {
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
