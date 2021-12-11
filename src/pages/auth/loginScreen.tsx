import { Button, Col, Row, Form, Input, Checkbox } from 'antd';
import get from 'lodash/get';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useSearchParams } from 'react-router-dom';
import { login } from '../../redux/actions/userActions';
import { IAppState } from '../../redux/reducers/indexReducer';
import ROUTES from '../../router';

// Images
import logo from '../../assets/images/logo.svg';
import illustration from '../../assets/images/illustration.svg';

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
		<div className="login-page-style">
			<Row>
				<Col span={10}>
					<div className="left-section">
						<img src={logo} className='logo-img' />
						<div className="content">
							<h2 className="title1">An App for your Study need you!</h2>
							<p className="description">Maybe some text here will help me see it better. Oh God. Oke, let’s do it then. </p>
						</div>

						<img src={illustration} className='illustration-img' />
					</div>
				</Col>
				<Col span={14}>
					<div className="right-section">

						<div className='form-section'>
							<div className="content">
								<div className="emoji-style">👋</div>
								<h2 className="title1">Welcome to StudyTorch!</h2>
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
									<Button type="link" className='color-primary'>
										Forgot Password?
									</Button>
								</Form.Item>

								<Form.Item>
									<Button onClick={onLogin} className='btn-danger' htmlType="submit">
										Login
									</Button>
								</Form.Item>

								<Form.Item>
									Don’t have a Account? <Button type="link" className='color-primary'>Register Now!</Button>
								</Form.Item>
							</Form>
						</div>
					</div>
				</Col>
			</Row>
		</div>
	)
}

export default LoginScreen;
