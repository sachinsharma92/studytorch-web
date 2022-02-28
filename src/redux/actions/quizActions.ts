import * as APIS from '../../constants/apis';
import { getUrl, replaceMultiple } from '../../utilities/helpers';

export const createIndividualQuiz =
  (payload: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .post(APIS.CREATE_USER_COLLECTION_QUIZZES, payload)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const createsharedCollectionQuiz =
  (payload: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .post(APIS.CREATE_SHARED_COLLECTION_QUIZZES, payload)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const createGroupCollectionQuiz =
  (id: any, payload: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .post(
        replaceMultiple(APIS.CREATE_GROUP_COLLECTION_QUIZZES, {
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

export const fetchUserQuizzes =
  (query: any = {}): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .get(getUrl(APIS.USER_QUIZZES, query))
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const fetchUserGroupQuizzes =
  (id: any, query: any = {}): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .get(getUrl(replaceMultiple(APIS.GROUP_QUIZZES, { ':id': id }), query))
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const fetchQuizDetails =
  (id: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .get(`${APIS.QUIZZ_DETAILS}/${id}`)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const submitQuiz =
  (id: any, payload: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .post(
        replaceMultiple(APIS.SUBMIT_QUIZZ, {
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
