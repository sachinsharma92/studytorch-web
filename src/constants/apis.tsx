///########AUTH#############
export const LOGIN = '/login';
export const REGISTER = '/signup';
export const PROFILE = '/profile';
export const FORGOT_PASSWORD = '/forgot-password';
export const CHANGE_PASSWORD = '/change-password';
export const VERIFY_FORGOT_PASSWORD = '/verify-code';

///########COLLECTIONS#############
export const COLLECITONS = 'collections';
export const SHARED_COLLECITONS = 'share-collections';

///########NOTES#############
export const NOTES = 'notes';

///########NOTES#############
export const QUESTION = 'questions';

///########GROUPS#############
export const GROUPS = 'groups';
export const LEAVE_GROUP = 'groups/:id/leave-group';
export const USERS_FOR_GROUP = 'groups/:id/users';
export const ADD_MEMBER_TO_GROUP = 'groups/:id/add-members';

///########MEDIA#############
export const UPLOAD_IMAGE = '/media';
export const IMAGE_UPLOAD = `${process.env.REACT_APP_API_HOST}/media`;
export const UNLINK_NOTE_MEDIA = '/media/:mediaUuid';
