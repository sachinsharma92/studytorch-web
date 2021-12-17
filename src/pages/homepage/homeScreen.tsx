import { Button } from 'antd';
import React from 'react'
import { useDispatch } from 'react-redux';
import PrimaryLayout from '../../common/primaryLayout/primaryLayout';
import requireAuth from '../../hocs/requireAuth'
import { logout } from '../../redux/actions/userActions';

function HomeScreen() {

    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(logout());
    }

    return (
        <PrimaryLayout>
            HomeScreen
            <Button onClick={onLogout}>Logout</Button>
        </PrimaryLayout>
    )
}

export default requireAuth(HomeScreen);
