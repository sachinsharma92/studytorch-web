import { useState } from 'react';
import { Button, Menu, PageHeader, Table, Space, Avatar, Select } from 'antd';
import { EditOutlined, DeleteOutlined, UserAddOutlined, InfoCircleOutlined } from '@ant-design/icons';
import ROUTES from '../../../router';
import PrimaryLayout from '../../../common/primaryLayout/primaryLayout';
import EmptyState from '../../../common/emptyState/emptyState';
import GroupCreateModal from '../../../components/groups/modals/groupCreateModal';

// Images
import folderGray from "../../../assets/images/icons/folder-gray.svg";
import User from "../../../assets/images/icons/user.svg";

// Styles
import './styles.scss';
import GroupMemberModal from '../../../components/groups/modals/groupMemberModal';


const { Option } = Select;

const menu = (
	<Menu>
		<Menu.Item icon={<EditOutlined />}>
			<a target="_blank" rel="noopener noreferrer" href="#">
				Rename
			</a>
		</Menu.Item>
		<Menu.Item icon={<DeleteOutlined />}>
			<a target="_blank" rel="noopener noreferrer" href="#">
				Delete
			</a>
		</Menu.Item>
		<Menu.Item icon={<InfoCircleOutlined />}>
			<a target="_blank" rel="noopener noreferrer" href="#">
				Get Details
			</a>
		</Menu.Item>
		<Menu.Item icon={<UserAddOutlined />}>
			<a target="_blank" rel="noopener noreferrer" href="#">
				Share
			</a>
		</Menu.Item>
	</Menu>
);

const columns = [
	{
		title: 'Member',
		dataIndex: 'member',
		key: 'member',
	},
	{
		title: 'Member Since',
		dataIndex: 'memberSince',
		key: 'memberSince',
	},
	{
		title: 'Action',
		key: 'action',
		render: () => (
			<Space size="middle">
				<div>
					<Select className='select-box' defaultValue="admin">
						<Option value="admin">Admin</Option>
						<Option value="user">User</Option>
					</Select>
				</div>
				<Button className='btn-close'>x</Button>
			</Space>
		),
	},
];

const data = [
	{
		key: '1',
		member: <div className='name-section'><Avatar>GS</Avatar><span className='name'>Gwen Stefancy</span></div>,
		memberSince: '08 / 11 / 2021',
		action: 'New York No. 1 Lake Park',
	},
	{
		key: '2',
		member: <div className='name-section'><Avatar>GS</Avatar><span className='name'>Gwen Stefancy</span></div>,
		memberSince: '08 / 11 / 2021',
		action: 'New York No. 1 Lake Park',
	},
	{
		key: '3',
		member: <div className='name-section'><Avatar>GS</Avatar><span className='name'>Gwen Stefancy</span></div>,
		memberSince: '08 / 11 / 2021',
		action: 'New York No. 1 Lake Park',
	},
	{
		key: '4',
		member: <div className='name-section'><Avatar>GS</Avatar><span className='name'>Gwen Stefancy</span></div>,
		memberSince: '08 / 11 / 2021',
		action: 'New York No. 1 Lake Park',
	},
	{
		key: '5',
		member: <div className='name-section'><Avatar>GS</Avatar><span className='name'>Gwen Stefancy</span></div>,
		memberSince: '08 / 11 / 2021',
		action: 'New York No. 1 Lake Park',
	},
];


function GroupMembersScreen(props: any) {

	const [isGroupCreateModal, setIsGroupCreateModal] = useState(false);
	const groupToggleModal = () => {
		setIsGroupCreateModal(!isGroupCreateModal);
	};

	const [isGroupMemberModal, setIsGroupMemberModal] = useState(false);
	const groupMemberModalToggle = () => {
		setIsGroupMemberModal(!isGroupMemberModal);
	};


	return (
		<PrimaryLayout>
			<div className="member-page-style">
				<PageHeader
					className="site-page-header header-back"
					onBack={() => window.history.back()}
					title={<div className='title-top'>Members in <span>Maths</span></div>}
					extra={[
						<div className="btn-section-top">
							<Button icon={<img src={User} className="img-white img-user" />} shape="round" type="primary" size="large" onClick={groupMemberModalToggle}>
								Add Members
							</Button>
						</div>
					]}
				/>

				{props.collectionData ? <div className="state-center">
					<EmptyState
						imgUrl={folderGray}
						title="Create your Collection"
						description=" Your Collection can be the folder underwhich all the study material is kept"
						buttonText="Add Collection"
						buttonType="primary"
					/>
				</div>
					:
					<div className="table-section">
						<Table columns={columns} dataSource={data} />
					</div>
				}
			</div>


			{/* Collection Modal here */}
			<GroupCreateModal
				visible={isGroupCreateModal}
				onCancel={groupToggleModal}
				buttonHandler={ROUTES.GROUPS_DETAIL_SCREEN}
			/>

			<GroupMemberModal
				visible={isGroupMemberModal}
				onCancel={groupMemberModalToggle}
				cancelHandler={groupMemberModalToggle}
			/>

		</PrimaryLayout>
	)
}

export default GroupMembersScreen;