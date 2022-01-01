import { Spin } from 'antd';
import get from 'lodash/get';
import { lazy, Suspense, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import * as ROUTES from './router/routes';

/**
 * Screens
 */
const HomeScreen = lazy(() => import(/* webpackChunkName: "HomeScreen" */ './pages/homepage/homeScreen'));
const LoginScreen = lazy(() => import(/* webpackChunkName: "LoginScreen" */ './pages/auth/loginScreen'));
const RegisterScreen = lazy(() => import(/* webpackChunkName: "RegisterScreen" */ './pages/auth/registerScreen'));
const ForgotScreen = lazy(() => import(/* webpackChunkName: "ForgotScreen" */ './pages/auth/forgotScreen'));
const OnboardingScreen = lazy(() => import(/* webpackChunkName: "OnboardingScreen" */ './pages/onboarding/onboardingScreen'));
const CollectionScreen = lazy(() => import(/* webpackChunkName: "Collection" */ './pages/collection/collection'));
const CollectionDetailsScreen = lazy(() => import(/* webpackChunkName: "CollectionDetails" */ './pages/collection/collectionDetails'));
const GroupsScreen = lazy(() => import(/* webpackChunkName: "CollectionDetails" */ './pages/groups/groups'));
const GroupDetailScreen = lazy(() => import(/* webpackChunkName: "CollectionDetails" */ './pages/groups/groupsDetails'));

const AppRouter = () => {
    const isLoggedIn = useSelector((state) => get(state, 'auth.isLoggedIn'));
    const [isLoading, setIsLoading] = useState(false);

    return (
        <Spin spinning={isLoading}>
            <Suspense fallback={(<Spin spinning={true} />)} >
                <Router>
                    <Routes>
                        <Route path={ROUTES.HOME_SCREEN} element={<HomeScreen />} />
                        <Route path={ROUTES.LOGIN_SCREEN} element={<LoginScreen />} />
                        <Route path={ROUTES.SIGNUP_SCREEN} element={<RegisterScreen />} />
                        <Route path={ROUTES.FORGOT_SCREEN} element={<ForgotScreen/>} />
                        <Route path={ROUTES.ONBOARDING_SCREEN} element={<OnboardingScreen/>} />

                        {/* New flow here */}
                        <Route path={ROUTES.COLLECTION_SCREEN} element={<CollectionScreen/>} />
                        <Route path={ROUTES.COLLECTION_DETAILS_SCREEN} element={<CollectionDetailsScreen/>} />
                        <Route path={ROUTES.GROUPS_SCREEN} element={<GroupsScreen/>} />
                        <Route path={ROUTES.GROUPS_DETAIL_SCREEN} element={<GroupDetailScreen/>} />
                        
                    </Routes>
                </Router>
            </Suspense>
        </Spin>
    );
};

export default AppRouter;
