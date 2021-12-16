import { Button,Form, Input, Checkbox } from 'antd';
import ROUTES from '../../router';
import AuthLayout from './authLayout';


// Styles
import './styles.scss';

/**
 * Props
 */
interface RegisterScreenProps {

}

function RegisterScreen(props: RegisterScreenProps) {

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
						<h2 className="title2">Create your Account</h2>
						<p className="description">It’s free and easy</p>
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
							label="Full name"
							name="fullname"
							rules={[{ required: true, message: 'Please input your fullname!' }]}
						>
							<Input placeholder='Type your e-mail or phone number' />
						</Form.Item>

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

						<Form.Item
							label="Confirm Password"
							name="confirmPassword"
							rules={[{ required: true, message: 'Please input your confirm password!' }]}
						>
							<Input.Password placeholder='Type your password' />
						</Form.Item>

						<Form.Item className='checkbox-style'>
							<Checkbox>By creating an account means you agree to the Terms and Conditions, and our Privacy Policy</Checkbox>
						</Form.Item>


						<Form.Item>
							<Button className='btn-danger' htmlType="submit">
								Register
							</Button>
						</Form.Item>

						<Form.Item>
							Have a Account? <Button type="link" href={ROUTES.LOGIN_SCREEN} className='color-primary'>Sign up Now !</Button>
						</Form.Item>
					</Form>
				</div>
			</AuthLayout>
		</div>
	)
}

export default RegisterScreen;
