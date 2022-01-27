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
		title: 'Rank',
		dataIndex: 'rank',
		key: 'rank',
	},
	{
		title: 'Member',
		dataIndex: 'member',
		key: 'member',
	},
	{
		title: 'Score',
		dataIndex: 'score',
		key: 'score',
	},
	{
		title: 'Time',
		dataIndex: 'time',
		key: 'time',
	},
	{
		title: 'Taken on',
		dataIndex: 'takenOn',
		key: 'takenOn',
	},
];

const data = [
	{
		key: '1',
		rank: '1',
		member: <div className='name-section'><Avatar>GS</Avatar><span className='name'>Gwen Stefancy</span></div>,
		score: '5000',
		time: '20:00',
		takenOn: '08 / 11 / 2021',
	},
	{
		key: '2',
		rank: '2',
		member: <div className='name-section'><Avatar>GS</Avatar><span className='name'>Gwen Stefancy</span></div>,
		score: '5000',
		time: '20:00',
		takenOn: '08 / 11 / 2021',
	},
	{
		key: '3',
		rank: '3',
		member: <div className='name-section'><Avatar>GS</Avatar><span className='name'>Gwen Stefancy</span></div>,
		score: 'Nil',
		time: '20:00',
		takenOn: '08 / 11 / 2021',
	},
	{
		key: '4',
		rank: '#',
		member: <div className='name-section'><Avatar>GS</Avatar><span className='name'>Gwen Stefancy</span></div>,
		score: '5000',
		time: <div className='text-not-taken'>Not Taken</div>,
		takenOn: '08 / 11 / 2021',
	},
	{
		key: '5',
		rank: '#',
		member: <div className='name-section'><Avatar>GS</Avatar><span className='name'>Gwen Stefancy</span></div>,
		score: '5000',
		time: <div className='text-not-taken'>Not Taken</div>,
		takenOn: 'Nil',
	},
];


function ScoreDetailScreen(props: any) {

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
			<div className="score-page-style">
				<PageHeader
					className="site-page-header header-back"
					onBack={() => window.history.back()}
					title={<div className='title-top'>Score Details of  <span>Quiz Name</span></div>}
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

export default ScoreDetailScreen;