import { useState } from 'react';
import { Col, Menu, Row, } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UserAddOutlined, InfoCircleOutlined } from '@ant-design/icons';
import ROUTES from '../../router';
import PrimaryLayout from '../../common/primaryLayout/primaryLayout';
import EmptyState from '../../common/emptyState/emptyState';
import GroupsCard from '../../components/groups/groupsCard/groupsCard';
import ButtonCustom from '../../common/buttons/buttonCustom';
import GroupCreateModal from '../../components/groups/modals/groupCreateModal';

// Images
import folderGray from "../../assets/images/icons/folder-gray.svg";
import curveImgae from "../../assets/images/curve-lines.svg";

// Styles
import './styles.scss';


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

const cardData = [
	{
		title: "Group Name",
		description: "Created by Mudita . 7 members",
		backgroundImgae: curveImgae,
		cardBg: '#FFEDE3',
	},
	{
		title: "Group Name",
		description: "Created by Mudita . 7 members",
		backgroundImgae: curveImgae,
		cardBg: '#E3F8FF',
	},
	{
		title: "Group Name",
		description: "Created by Mudita . 7 members",
		backgroundImgae: curveImgae,
		cardBg: '#FFE3E1',
	},
	{
		title: "Group Name",
		description: "Created by Mudita . 7 members",
		backgroundImgae: curveImgae,
		cardBg: '#EFF2FF',
	},
	{
		title: "Group Name",
		description: "Created by Mudita . 7 members",
		backgroundImgae: curveImgae,
		cardBg: '#FFEDE3',
	},
	{
		title: "Group Name",
		description: "Created by Mudita . 7 members",
		backgroundImgae: curveImgae,
		cardBg: '#E3F8FF',
	},
]

function GroupsScreen(props: any) {

	const [isGroupCreateModal, setIsGroupCreateModal] = useState(false);
	const groupToggleModal = () => {
		setIsGroupCreateModal(!isGroupCreateModal);
	};

	return (
		<PrimaryLayout>
			<div className="group-page-style">
				<h3 className="title3">Groups</h3>

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
					<div className="card-section">
						<Row gutter={32}>
							{cardData.map((data, index) => (
								<Col sm={8} key={index}>
									<GroupsCard
										backgroundImgae={data.backgroundImgae}
										title={data.title}
										description={data.description}
										menuData={menu}
										cardHandler={ROUTES.COLLECTION_DETAILS_SCREEN}
										bgColor={data.cardBg}
									/>
								</Col>
							))}
						</Row>
					</div>
				}
			</div>


			{/* Collection Modal here */}
			<GroupCreateModal
				visible={isGroupCreateModal}
				onCancel={groupToggleModal}
				buttonHandler={ROUTES.GROUPS_DETAIL_SCREEN}
			/>

			<ButtonCustom onClick={groupToggleModal} icon={<PlusOutlined />} title="Create Group" type="primary" btnContainer="group-btn-add" />

		</PrimaryLayout>
	)
}

export default GroupsScreen;