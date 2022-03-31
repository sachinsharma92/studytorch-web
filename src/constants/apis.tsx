///########AUTH#############
export const LOGIN = '/login';
export const REGISTER = '/signup';
export const PROFILE = '/profile';
export const USER_NOTIFICATION = '/users/notifications';
export const FORGOT_PASSWORD = '/forgot-password';
export const CHANGE_PASSWORD = '/change-password';
export const VERIFY_FORGOT_PASSWORD = '/verify-code';
export const DELETE_USER = '/users';

///########DASHBOARD#############
export const DASHBOARD_METRICES = '/dashboard/metrics';
export const DASHBOARD_PATTERN = '/dashboard/study-pattern';
export const DASHBOARD_QUIZ_PATTERN = '/dashboard/quiz-pattern';
export const DASHBOARD_COLLECTION = '/dashboard/collections';
export const DASHBOARD_GLOBAL_SEARCH = '/dashboard/global-search';

///########COLLECTIONS#############
export const COLLECITONS = 'collections';
export const USERS_FOR_COLLECTION = 'collections/:id/users';
export const SHARED_COLLECITONS = 'share-collections';
export const SHARED_USERS = 'collections/:id/shared-users';
export const SHARED_COLLECTION = 'share-collections';
export const SHARED_COLLECTION_TO_GROUP =
  'collections/:id/share-group/:groupUuid';
export const REMOVE_USER_SHARED_COLLECTION =
  'share-collections/:uuid/remove/:user_uuid';
export const GET_COLLECTION_INVITED_MEMBER =
  'collections/:parent_id/invited-members';

///########NOTES#############
export const NOTES = 'notes';

///########NOTES#############
export const QUESTION = 'questions';

///########FLASH CARD#############
export const FLASH_CARD = 'flash-card';

///########GROUPS#############
export const GROUPS = 'groups';
export const LEAVE_GROUP = 'groups/:id/leave-group';
export const USERS_FOR_GROUP = 'groups/:id/users';
export const ADD_MEMBER_TO_GROUP = 'groups/:id/add-members';
export const GET_INVITED_GROUP_MEMBER = 'groups/:id/invited-members';
export const REMOVE_MEMBER_TO_GROUP = 'groups/:id/remove-members/:member_id';
export const GROUP_REPORT = 'groups/:id/reports';
export const GROUP_QUIZ_DETAILS = 'groups/:gid/quizzes/:id';
export const CANCEL_INVITATION = '/cancel-invitation';

///########MEDIA#############
export const UPLOAD_IMAGE = '/media';
export const IMAGE_UPLOAD = `${process.env.REACT_APP_API_HOST}/media`;
export const UNLINK_NOTE_MEDIA = '/media/:mediaUuid';

///########CHECKLIST#############
export const CHECKLIST = '/checklists';
export const CHECKLIST_TASK = '/checklists/:id/tasks';
export const ARCHIVE_CHECKLIST_TASK = '/checklists/:id/archive-task';

///########USER CALENDAR#############
export const USER_CALENDAR = '/user-calendars';

///########QUIZZES#############
export const USER_QUIZZES = '/users/quizzes';
export const GROUP_QUIZZES = '/users/group/:id/quizzes';
export const CREATE_USER_COLLECTION_QUIZZES = '/quizzes';
export const CREATE_SHARED_COLLECTION_QUIZZES = '/shared-collections/quizzes';
export const CREATE_GROUP_COLLECTION_QUIZZES = '/groups/:id/quizzes';
export const QUIZZ_DETAILS = '/quizzes';
export const SUBMIT_QUIZZ = 'quizzes/:id/submit';
export const SUBMIT_QUIZZ_ANSWER = 'quizzes/:id/submit-answer';
