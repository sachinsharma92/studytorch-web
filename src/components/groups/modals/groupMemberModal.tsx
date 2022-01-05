import { Avatar, Button, List, Modal, Input, Select, Dropdown, Menu, Row, Col } from 'antd';
import { DownOutlined } from '@ant-design/icons';

// Styles
import './styles.scss';

const menu = (
	<Menu>
		<Menu.Item>
			<a href="">
				Admin
			</a>
		</Menu.Item>
		<Menu.Item>
			<a href="">
				Member
			</a>
		</Menu.Item>
	</Menu>
);


const { Option } = Select;

function GroupMemberModal(props: any) {


	return (
		<>
			<Modal
				centered
				visible={props.visible}
				footer={false}
				onCancel={props.onCancel}
				wrapClassName="group-members-style primary-modal-style"
				maskStyle={{ background: 'rgba(30,39,94, 0.8)' }}
				closable={false}
			>
				<div className="card-modal">
					<div className="modal-body-sec">

						<div className="header-section">
							<h3 className="title3">Group Members</h3>
						</div>

						<div className="flex-section">
							<div className="input-section">
								<Input.Group>
									<Input defaultValue="ayush.prshr9@gmail.com" />
									<Select defaultValue="admin">
										<Option value="admin">Admin</Option>
										<Option value="member">Member</Option>
									</Select>
								</Input.Group>
							</div>
							<Button onClick={props.addButtonHandler} className="btn-add" type="primary">Add</Button>
						</div>

						<div className="list-section">
							<Row>
								<Col sm={16}><div className="list-head-text">Members</div></Col>
								<Col sm={8}><div className="list-head-text">Role</div></Col>
							</Row>
							<List
								className="demo-loadmore-list"
								itemLayout="horizontal"
								dataSource={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
								renderItem={() => (
									<List.Item actions={[<Dropdown className="select-user-dropdown" overlay={menu} placement="bottomRight" arrow>
										<Button>Select User <DownOutlined /></Button>
									</Dropdown>, <a className="list-close-button">x</a>]}>
										<List.Item.Meta
											avatar={<Avatar className="avatar-sec">SS</Avatar>}
											title={<a href="https://ant.design">Gwen Stefancy</a>}
											description="gwen.s@gmail.com"
										/>
									</List.Item>
								)}
							/>
						</div>
					</div>
				</div>
			</Modal>
		</>
	)
}

export default GroupMemberModal;