import { Row, Col, Button, Switch } from 'antd';
import { useState } from 'react';
import ChangePassword from '../../common/profileLayout/modals/changePassword';

import ProfileLayout from '../../common/profileLayout/profileLayout';


// Styles
import './styles.scss';

function SecurityScreen(props: any) {

	const onChange = (checkedValues: any) => {
		console.log('checked = ', checkedValues);
	}

	const [isChangePassword, setIsChangePassword] = useState(false);
	const changePasswordToggleModal = () => {
		setIsChangePassword(!isChangePassword);
	};

	return (
		<ProfileLayout className="security-page-style">
			<h2 className="title2">Account</h2>

			<div className="title-sm">
				Security
			</div>

			<div className="edit-section">
				<Row>
					<Col sm={20}>
						<h4 className="title4">Password</h4>
						<p className="description">
							Edit your Current Password to protect your personal account
						</p>
					</Col>
					<Col sm={4}>
						<Button type="link" onClick={changePasswordToggleModal}>Edit Password</Button>
					</Col>
				</Row>
			</div>

			<ChangePassword
				visible={isChangePassword}
				addHandler={changePasswordToggleModal}
				cancelHandler={changePasswordToggleModal}
				onCancel={changePasswordToggleModal}
			/>
		</ProfileLayout>
	)
}

export default SecurityScreen;