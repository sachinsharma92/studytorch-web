import * as UserActions from '../actions/userActions';


export interface IUser {
  id: number;
  name: string;
  phone?: string;
  email?: string;
}

export interface IUserState {
  id?: number;
  accessToken?: string;
  user?: IUser;
}

function initializeState(): IUserState {
  return {};
}

export function reduce(
  state: IUserState = initializeState(),
  action: any,
): IUserState {
  switch (action.type) {

    case UserActions.USER_LOGGED_IN:
      const { id, accessToken, user } = action.payload;
      return { id: id, accessToken: accessToken, user };

    case UserActions.USER_LOG_OUT:
      return initializeState();

    default:
      return state;
  }
}
