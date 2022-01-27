import { Button, Form, Input,Spin } from 'antd';
import get from 'lodash/get';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { login } from '../../redux/actions/userActions';
import { IAppState } from '../../redux/reducers/indexReducer';
import ROUTES from '../../router';
import AuthLayout from './authLayout';

// Styles
import './styles.scss';

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
	
	const [loading,setLoading]=useState(false)
	let isLoggedIn = useSelector((state: IAppState) => get(state, 'userState.isLoggedIn'));

	const onLogin = (payload:any) => {
		setLoading(true);
		dispatch(login(payload)).then(()=>{
			setLoading(false)
		}).catch(()=>{
			setLoading(false)
		})
	}

	if (isLoggedIn) {
		return <Navigate to={ROUTES.HOME_SCREEN} />;
	}

	const onFinish = (values: any) => {
		
		onLogin(values)
	};

	const onFinishFailed = (errorInfo: any) => {};

	return (
		<div className="auth-page-style">
			<AuthLayout>
			<Spin spinning={loading}>
				<div className="form-section">
					<div className="content">
						<div className="emoji-style">👋</div>
						<h2 className="title2">Welcome to StudyTorch!</h2>
						<p className="description">Login to your account</p>
					</div>

					
					<Form
						name="basic"
						initialValues={{ remember: true }}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete="off"
						layout='vertical'
					>
						<Form.Item
							label="E-mail "
							name="email"
							rules={[{ required: true, message: 'Please input your email!' },{
								type:'email',
								message: 'Please input valid email format!' 
							}]}
						>
							<Input placeholder='Type your e-mail ' />
						</Form.Item>

						<Form.Item
							label="Password"
							name="password"
							rules={[{ required: true, message: 'Please input your password!' },{
								min:6,
								message: 'Password is of minimum 6 characters'
							}]}
						>
							<Input.Password placeholder='Type your password' />
						</Form.Item>

						<Form.Item className='text-right'>
							<Button type="link" href={ROUTES.FORGOT_SCREEN} className='color-primary'>
								Forgot Password?
							</Button>
						</Form.Item>

						<Form.Item>
							<Button  className='btn-danger' htmlType="submit">
								Login
							</Button>
						</Form.Item>

						<Form.Item>
							Don’t have a Account? <Button type="link" href={ROUTES.SIGNUP_SCREEN} className='color-primary'>Register Now!</Button>
						</Form.Item>
					</Form>
				</div>
				</Spin>
			</AuthLayout>
		</div>
	)
}

export default LoginScreen;
