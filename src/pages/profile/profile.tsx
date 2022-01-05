import { Form, Input, Button, Checkbox } from 'antd';

import ProfileLayout from '../../common/profileLayout/profileLayout';
import UploadImage from '../../common/profileLayout/uploadImage';


// Styles
import './styles.scss';

function ProfileScreen(props: any) {
	const onFinish = (values: any) => {
		console.log('Success:', values);
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<ProfileLayout className="profile-page-style">
			<h2 className="title2">Account</h2>

			<div className="title-sm">
				My Profile
			</div>

			<div className="profile-image-upload">
				<UploadImage />

				<div className="info-sec">
					<h3 className="title3">Ayush Parashar</h3>
					<div className="description">ayush.prshr9@gmai.com</div>
				</div>
			</div>

			<div className="form-section">
				<Form
					name="basic"
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
					layout="vertical"
				>
					<Form.Item
						label="Your name"
						name="username"
						rules={[{ required: true, message: 'Please enter name!' }]}
					>
						<Input defaultValue="Ayush Parashar" />
					</Form.Item>

					<Form.Item
						label="E-mail or phone number"
						name="email"
						rules={[{ required: true, message: 'Please enter correct email!' }]}
					>
						<Input defaultValue="ayush.prshr9@gmail.com" />
					</Form.Item>

					<Form.Item>
						<Button type="primary" htmlType="submit">
						Save Changes
						</Button>
					</Form.Item>
				</Form>
			</div>
		</ProfileLayout>
	)
}

export default ProfileScreen;