import { Spin, Skeleton } from "antd";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import * as ROUTES from "./router/routes";
import LogoutScreen from "./pages/auth/logoutScreen";
import TestScreen from "./pages/test";

/**
 * Screens
 */
const HomeScreen = lazy(
  () =>
    import(/* webpackChunkName: "HomeScreen" */ "./pages/homepage/homeScreen")
);
const LoginScreen = lazy(
  () => import(/* webpackChunkName: "LoginScreen" */ "./pages/auth/loginScreen")
);
const RegisterScreen = lazy(
  () =>
    import(
      /* webpackChunkName: "RegisterScreen" */ "./pages/auth/registerScreen"
    )
);
const ForgotScreen = lazy(
  () =>
    import(/* webpackChunkName: "ForgotScreen" */ "./pages/auth/forgotScreen")
);
const OnboardingScreen = lazy(
  () =>
    import(
      /* webpackChunkName: "OnboardingScreen" */ "./pages/onboarding/onboardingScreen"
    )
);
const CollectionScreen = lazy(
  () =>
    import(/* webpackChunkName: "Collection" */ "./pages/collection/collection")
);
const CollectionDetailsScreen = lazy(
  () =>
    import(
      /* webpackChunkName: "CollectionDetails" */ "./pages/collection/collectionDetails"
    )
);
const GroupsScreen = lazy(
  () => import(/* webpackChunkName: "groups" */ "./pages/groups/groups")
);
const GroupDetailScreen = lazy(
  () =>
    import(
      /* webpackChunkName: "groupsDetails" */ "./pages/groups/groupsDetails"
    )
);
const QuizScreen = lazy(
  () => import(/* webpackChunkName: "quiz" */ "./pages/quiz/quiz")
);
const PlannerScreen = lazy(
  () => import(/* webpackChunkName: "planner" */ "./pages/planner/planner")
);
const ChecklistScreen = lazy(
  () =>
    import(/* webpackChunkName: "checklist" */ "./pages/checklist/checklist")
);
const ProfileScreen = lazy(
  () => import(/* webpackChunkName: "profile" */ "./pages/profile/profile")
);
const NotificationScreen = lazy(
  () =>
    import(
      /* webpackChunkName: "notification" */ "./pages/profile/notification"
    )
);
const SecurityScreen = lazy(
  () => import(/* webpackChunkName: "security" */ "./pages/profile/security")
);
const AccountDeleteScreen = lazy(
  () =>
    import(
      /* webpackChunkName: "accountDelete" */ "./pages/profile/accountDelete"
    )
);
const SharedWithMeScreen = lazy(
  () =>
    import(
      /* webpackChunkName: "sharedWithMeScreen" */ "./pages/sharedWithMe/sharedWithMeScreen"
    )
);
const SharedWithMeDetailScreen = lazy(
  () =>
    import(
      /* webpackChunkName: "shareWithMeDetails" */ "./pages/sharedWithMe/shareWithMeDetails"
    )
);
const GroupMembersScreen = lazy(
  () => import(/* webpackChunkName: "members" */ "./pages/groups/members/")
);
const ScoreDetailScreen = lazy(
  () =>
    import(
      /* webpackChunkName: "scoreDetails" */ "./pages/groups/scoreDetails/"
    )
);

const ReadNoteScreen = lazy(
  () =>
    import(
      /* webpackChunkName: "scoreDetails" */ "./pages/collection/readNote/readNote"
    )
);

const GroupInvitationScreen = lazy(
  () =>
    import(
      /* webpackChunkName: "scoreDetails" */ "./pages/invitation/groupInvitationScreen"
    )
);

const CollectionInvitationScreen = lazy(
  () =>
    import(
      /* webpackChunkName: "scoreDetails" */ "./pages/invitation/collectionInvitationScreen"
    )
);
const ArchiveScreen = lazy(
  () => import(/* webpackChunkName: "scoreDetails" */ "./pages/archives")
);

const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={<Skeleton />}>
        <Routes>
          <Route path={"/test"} element={<TestScreen />} />
          <Route
            path={ROUTES.GROUP_INVITAION}
            element={<GroupInvitationScreen />}
          />
          <Route
            path={ROUTES.SHARED_COLLECTION_INVITAION}
            element={<CollectionInvitationScreen />}
          />
          <Route path={ROUTES.HOME_SCREEN} element={<HomeScreen />} />
          <Route path={ROUTES.LOGIN_SCREEN} element={<LoginScreen />} />
          <Route path={"/"} element={<LoginScreen />} />
          <Route path={ROUTES.LOGOUT_SCREEN} element={<LogoutScreen />} />
          <Route path={ROUTES.SIGNUP_SCREEN} element={<RegisterScreen />} />
          <Route path={ROUTES.FORGOT_SCREEN} element={<ForgotScreen />} />
          <Route path={ROUTES.SHARED_SCREEN} element={<SharedWithMeScreen />} />
          <Route
            path={ROUTES.ONBOARDING_SCREEN}
            element={<OnboardingScreen />}
          />
          <Route path={ROUTES.READ_NOTE_SCREEN} element={<ReadNoteScreen />} />
          {/* New flow here */}
          <Route
            path={ROUTES.COLLECTION_SCREEN}
            element={<CollectionScreen />}
          />
          <Route
            path={ROUTES.COLLECTION_DETAILS_SCREEN}
            element={<CollectionDetailsScreen />}
          />
          <Route path={ROUTES.GROUPS_SCREEN} element={<GroupsScreen />} />
          <Route
            path={ROUTES.GROUPS_DETAIL_SCREEN}
            element={<GroupDetailScreen />}
          />
          <Route path={ROUTES.QUIZ_SCREEN} element={<QuizScreen />} />
          <Route path={ROUTES.ARCHIVED} element={<ArchiveScreen />} />
          <Route path={ROUTES.PLANNER_SCREEN} element={<PlannerScreen />} />
          <Route path={ROUTES.CHECKLIST_SCREEN} element={<ChecklistScreen />} />
          <Route path={ROUTES.PROFILE_SCREEN} element={<ProfileScreen />} />
          <Route
            path={ROUTES.NOTIFICATION_SCREEN}
            element={<NotificationScreen />}
          />
          <Route path={ROUTES.SECURITY_SCREEN} element={<SecurityScreen />} />
          <Route
            path={ROUTES.ACCOUNT_DELETE_SCREEN}
            element={<AccountDeleteScreen />}
          />
          <Route
            path={ROUTES.SHARED_DETAILS_SCREEN}
            element={<SharedWithMeDetailScreen />}
          />
          <Route
            path={ROUTES.GROUP_MEMBERS_SCREEN}
            element={<GroupMembersScreen />}
          />
          <Route
            path={ROUTES.GROUP_SCORE_DETAILS_SCREEN}
            element={<ScoreDetailScreen />}
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
