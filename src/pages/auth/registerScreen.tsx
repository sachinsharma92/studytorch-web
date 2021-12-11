import { Button, Col, Row, Form, Input, Checkbox } from 'antd';

// Images
import logo from '../../assets/images/logo.svg';
import illustration from '../../assets/images/illustration.svg';

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
								<h2 className="title1">Create your Account</h2>
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
									Have a Account? <Button type="link" className='color-primary'>Sign up Now !</Button>
								</Form.Item>
							</Form>
						</div>
					</div>
				</Col>
			</Row>
		</div>
	)
}

export default RegisterScreen;
