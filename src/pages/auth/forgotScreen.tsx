import { Button, Form, Input, } from 'antd';
import { Link } from 'react-router-dom';
import ROUTES from '../../router';
import AuthLayout from './authLayout';

// Styles
import './styles.scss';


function ForgotScreen(props:any) {

	const onFinish = (values: any) => {
		console.log('Success:', values);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};


	return (
		<div className="auth-page-style">
			<AuthLayout>
				{props.emailSent ? <div className="form-section">
					<div className="content">
						<div className="emoji-style">🔐</div>
						<h2 className="title2">Password Reset</h2>
						<p className="description">Enter your email and we will send you a reset link</p>
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
							label="Registered Email"
							name="username"
							rules={[{ required: true, message: 'Please input your username!' }]}
						>
							<Input placeholder='Type your e-mail or phone number' />
						</Form.Item>

						<Form.Item>
							<Button className='btn-danger' htmlType="submit">
								Reset Password
							</Button>
						</Form.Item>
					</Form>
				</div>

					:
					<div className="content">
						<div className="emoji-style">🔐</div>
						<h2 className="title1">Email Sent</h2>
						<p className="description">An Email has been sent to <Link to="">example@gmail.com</Link></p>

						<Button className='btn-danger' href={ROUTES.LOGIN_SCREEN}>
							Login
						</Button>
					</div>

				}
			</AuthLayout>
		</div>
	)
}

export default ForgotScreen;
