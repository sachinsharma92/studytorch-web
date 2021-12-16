import { Button, Form, Input, } from 'antd';
import get from 'lodash/get';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useSearchParams } from 'react-router-dom';
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
	let [searchParams, setSearchParams] = useSearchParams();
	let isLoggedIn = useSelector((state: IAppState) => get(state, 'userState.accessToken'));

	const onLogin = () => {
		dispatch(login(987654321, '2932'));
	}

	if (isLoggedIn) {
		return <Navigate to={searchParams.get("redirect") || ROUTES.HOME_SCREEN} />;
	}

	const onFinish = (values: any) => {
		console.log('Success:', values);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};


	return (
		<div className="auth-page-style">
			<AuthLayout>
				<div className="form-section">
					<div className="content">
						<div className="emoji-style">👋</div>
						<h2 className="title2">Welcome to StudyTorch!</h2>
						<p className="description">Login to your account</p>
					</div>

					{/* <img src={logo} /> */}
					<Form
						name="basic"
						initialValues={{ remember: true }}
						onFinish={onFinish}
						onFinishFailed={onFinishFailed}
						autoComplete="off"
						layout='vertical'
					>
						<Form.Item
							label="E-mail or phone number"
							name="username"
							rules={[{ required: true, message: 'Please input your username!' }]}
						>
							<Input placeholder='Type your e-mail or phone number' />
						</Form.Item>

						<Form.Item
							label="Password"
							name="password"
							rules={[{ required: true, message: 'Please input your password!' }]}
						>
							<Input.Password placeholder='Type your password' />
						</Form.Item>

						<Form.Item className='text-right'>
							<Button type="link" href={ROUTES.FORGOT_SCREEN} className='color-primary'>
								Forgot Password?
							</Button>
						</Form.Item>

						<Form.Item>
							<Button onClick={onLogin} className='btn-danger' htmlType="submit">
								Login
							</Button>
						</Form.Item>

						<Form.Item>
							Don’t have a Account? <Button type="link" href={ROUTES.SIGNUP_SCREEN} className='color-primary'>Register Now!</Button>
						</Form.Item>
					</Form>
				</div>
			</AuthLayout>
		</div>
	)
}

export default LoginScreen;
