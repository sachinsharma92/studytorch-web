import { Spin } from 'antd';
import get from 'lodash/get';
import { lazy, Suspense, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import * as ROUTES from './router/routes';

/**
 * Screens
 */
const HomeScreen = lazy(() => import(/* webpackChunkName: "HomeScreen" */ './pages/homeScreen'));
const LoginScreen = lazy(() => import(/* webpackChunkName: "LoginScreen" */ './pages/loginScreen'));

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
                    </Routes>
                </Router>
            </Suspense>
        </Spin>
    );
};

export default AppRouter;
