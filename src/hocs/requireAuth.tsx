import { useSelector } from 'react-redux';
import get from 'lodash/get';
import * as ROUTES from '../router/routes';
import { IAppState } from '../redux/reducers/indexReducer';
import { Navigate } from 'react-router-dom';

const requireAuth = (ChildComponnent: () => JSX.Element) => () => {

    let isLoggedIn = useSelector((state: IAppState) => get(state, 'userState.accessToken'));

    if (!isLoggedIn) {
        return <Navigate to={ROUTES.LOGIN_SCREEN} />;
    }

    return <ChildComponnent />;
};

export default requireAuth;
