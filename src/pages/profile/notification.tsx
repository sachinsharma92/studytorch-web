import { Row, Col, Checkbox, Switch } from 'antd';

import ProfileLayout from '../../common/profileLayout/profileLayout';


// Styles
import './styles.scss';

function NotificationScreen(props: any) {

	const onChange = (checkedValues: any) => {
		console.log('checked = ', checkedValues);
	}
	return (
		<ProfileLayout className="notification-page-style">
			<h2 className="title2">Account</h2>

			<div className="title-sm">
				Notification
			</div>

			<div className="choose-section">
				<Row>
					<Col sm={20}>
						<div className="text-sec">
							<h3 className="title3">
								Email Notification
							</h3>
							<div className="description">
								Email me When
							</div>
						</div>
						<div className="checkbox-style">
							<Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
								<Checkbox value="A">Checkbox</Checkbox>
								<Checkbox value="B">Checkbox</Checkbox>
								<Checkbox value="C">Checkbox</Checkbox>
								<Checkbox value="D">Checkbox</Checkbox>
								<Checkbox value="E">Checkbox</Checkbox>
							</Checkbox.Group>
						</div>
					</Col>
					<Col sm={4}>
						<Switch checkedChildren="On" unCheckedChildren="Off" defaultChecked onChange={onChange} />
					</Col>
					<Col sm={20}>
						<div className="text-sec">
							<h3 className="title3">
								News Notification
							</h3>
							<div className="description">
								Email me When
							</div>
						</div>
						<div className="checkbox-style">
							<Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
								<Checkbox value="A">Checkbox</Checkbox>
								<Checkbox value="B">Checkbox</Checkbox>
								<Checkbox value="C">Checkbox</Checkbox>
								<Checkbox value="D">Checkbox</Checkbox>
								<Checkbox value="E">Checkbox</Checkbox>
							</Checkbox.Group>
						</div>
					</Col>
					<Col sm={4}>
						<Switch checkedChildren="On" unCheckedChildren="Off" defaultChecked onChange={onChange} />
					</Col>
				</Row>
			</div>
		</ProfileLayout>
	)
}

export default NotificationScreen;