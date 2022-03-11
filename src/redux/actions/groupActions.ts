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

export const fetchGroupReport =
  (id: any, query: any = {}): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    const url = getUrl(
      replaceMultiple(APIS.GROUP_REPORT, {
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

export const fetchGroupQuizDetails =
  (gid: any, id: any = {}): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    const url = getUrl(
      replaceMultiple(APIS.GROUP_QUIZ_DETAILS, {
        ':id': id,
        ':gid': gid,
      })
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

export const fetchInvitedGroupMember =
  (id: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .get(
        replaceMultiple(APIS.GET_INVITED_GROUP_MEMBER, {
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

export const addMemberToGroup =
  (id: any, payload: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .put(
        replaceMultiple(APIS.ADD_MEMBER_TO_GROUP, {
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

export const removeMemberToGroup =
  (groupID: any, memberId: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    return api
      .delete(
        replaceMultiple(APIS.REMOVE_MEMBER_TO_GROUP, {
          ':member_id': memberId,
          ':id': groupID,
        })
      )
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const verifyGroupLink =
  (uuid: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    const url = `groups/verify-link/${uuid}`;
    return api
      .get(url)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const onAcceptGroupLink =
  (uuid: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    const url = `groups/accept-link/${uuid}`;
    return api
      .post(url)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };

export const rejectLink =
  (uuid: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    const url = `reject-link/${uuid}`;
    return api
      .put(url)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        throw error;
      });
  };
