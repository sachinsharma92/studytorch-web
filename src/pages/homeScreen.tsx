import { Button } from 'antd';
import React from 'react'
import { useDispatch } from 'react-redux';
import requireAuth from '../hocs/requireAuth'
import { logout } from '../redux/actions/userActions';

function HomeScreen() {

    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(logout());
    }

    return (
        <div>
            HomeScreen
            <Button onClick={onLogout}>Logout</Button>
        </div>
    )
}

export default requireAuth(HomeScreen);
