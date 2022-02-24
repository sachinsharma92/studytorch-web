import * as APIS from '../../constants/apis';
import { getUrl } from '../../utilities/helpers';

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
  (payload: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .post(APIS.CREATE_GROUP_COLLECTION_QUIZZES, payload)
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
  (query: any = {}): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .get(getUrl(APIS.GROUP_QUIZZES, query))
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

// export const fetchQuizDetails =
//   (payload: any): any =>
//   (dispatch: any, getState: any, { api }: any): any => {
//     return api
//       .post(APIS.QUESTION, payload)
//       .then((result: any) => {
//         return result;
//       })
//       .catch((error: any) => {
//         throw error;
//       });
//   };
