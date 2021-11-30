import { Button } from 'antd';
import get from 'lodash/get';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useSearchParams } from 'react-router-dom';
import { login } from '../redux/actions/userActions';
import { IAppState } from '../redux/reducers/indexReducer';
import ROUTES from '../router';

/**
 * Props
 */
interface LoginScreenProps {

}

/**
 * 
 * @param props: LoginScreenProps
 * @returns JSX.Element
 */
function LoginScreen(props: LoginScreenProps) {

    const dispatch = useDispatch();
    let [searchParams, setSearchParams] = useSearchParams();
    let isLoggedIn = useSelector((state: IAppState) => get(state, 'userState.accessToken'));

    const onLogin = () => {
        dispatch(login(987654321, '2932'));
    }

    if (isLoggedIn) {
        return <Navigate to={searchParams.get("redirect") || ROUTES.HOME_SCREEN} />;
    }

    return (
        <div>
            LoginScreen
            <Button onClick={onLogin} >Login</Button>
        </div>
    )
}

export default LoginScreen;
