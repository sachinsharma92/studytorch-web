import * as APIS from '../../constants/apis';
import { getUrl, replaceMultiple } from '../../utilities/helpers';

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

export const shareCollectionToGroup =
  (uuid: any, groupUuid: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    const url = replaceMultiple(APIS.SHARED_COLLECTION_TO_GROUP, {
      ':id': uuid,
      ':groupUuid': groupUuid,
    });
    return api
      .post(url)
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

  export const archiveCollection =
  (id: number, payload: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .put(`${APIS.COLLECITONS}/${id}/archive`,payload)
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

export const fetchUserForCollection =
  (id: any, query: any = {}): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    const url = getUrl(
      replaceMultiple(APIS.USERS_FOR_COLLECTION, {
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

export const fetchCollectionSharedUsers =
  (id: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .get(
        replaceMultiple(APIS.SHARED_USERS, {
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

export const shareCollection =
  (payload: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .post(APIS.SHARED_COLLECTION, payload)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };


  export const duplicateCollection =
  (uuid: any,payload: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .post(replaceMultiple(APIS.DUPLICATE_COLLECTION,{':id':uuid}),payload)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const removeFromShareCollection =
  (id: any, user_id: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    const url = replaceMultiple(APIS.REMOVE_USER_SHARED_COLLECTION, {
      ':uuid': id,
      ':user_uuid': user_id,
    });
    return api
      .delete(url)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const leaveShareCollection =
  (id: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .delete(`${APIS.SHARED_COLLECITONS}/${id}`)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const fetchInvitedCollectionMember =
  (id: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .get(
        `${replaceMultiple(APIS.GET_COLLECTION_INVITED_MEMBER, {
          ':parent_id': id,
        })}`
      )
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const verifyCollectionLink =
  (uuid: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    const url = `share-collections/verify-link/${uuid}`;
    return api
      .get(url)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const onAcceptCollectionLink =
  (uuid: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    const url = `share-collections/accept-link/${uuid}`;
    return api
      .post(url)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };
