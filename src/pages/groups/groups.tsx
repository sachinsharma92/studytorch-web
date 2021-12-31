import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Menu, Row, Popover, } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UserAddOutlined, InfoCircleOutlined } from '@ant-design/icons';
import ROUTES from '../../router';
import PrimaryLayout from '../../common/primaryLayout/primaryLayout';
import EmptyState from '../../common/emptyState/emptyState';
import MasterCollectionModal from '../../components/collection/modals/masterCollection';

// Images
import folderGray from "../../assets/images/icons/folder-gray.svg";
import folderPurple from "../../assets/images/icons/folder-purple.svg";
import coralFolder from "../../assets/images/icons/coral-folder.svg";
import blueFolder from "../../assets/images/icons/folder-1.svg";
import folderPurpleUsers from "../../assets/images/icons/folder-purple-with-users.svg";
import babyPinkFolder from "../../assets/images/icons/baby-pink-folder.svg";
import curveImgae from "../../assets/images/curve-lines.svg";

// Styles
import './styles.scss';
import ShareCollectionModal from '../../components/collection/modals/shareCollection';
import NoteModalCard from '../../components/collection/modals/noteModalCard';
import QuestionModal from '../../components/collection/modals/questionModal';
import GroupsCard from '../../components/groups/groupsCard/groupsCard';


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

	const [isCollectionModal, setIsCollectionModal] = useState(false);
	const collectionToggleModal = () => {
		setIsCollectionModal(!isCollectionModal);
	};

	const [isShareModal, setIsShareModal] = useState(false);
	const shareToggleModal = () => {
		setIsShareModal(!isShareModal);
	};

	const [isNoteModal, setIsNoteModal] = useState(false);
	const noteToggleModal = () => {
		setIsNoteModal(!isNoteModal);
	};

	const [isQuestionModal, setIsQuestionModal] = useState(false);
	const questionToggleModal = () => {
		setIsQuestionModal(!isQuestionModal);
	};

	const toggleData = (
		<div className="toggle-menu">
			<a onClick={collectionToggleModal}>New Collection</a>
			<a onClick={noteToggleModal}>Notes</a>
			<a onClick={questionToggleModal}>Question</a>
		</div>
	);

	return (
		<PrimaryLayout>
			<div className="collection-page-style">
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
			<MasterCollectionModal
				visible={isCollectionModal}
				onCancel={collectionToggleModal}
				buttonHandler={ROUTES.COLLECTION_DETAILS_SCREEN}
			/>

			{/* Share Modal here */}
			<ShareCollectionModal
				visible={isShareModal}
				onCancel={shareToggleModal}
				doneHandler={shareToggleModal}
				cancelHandler={shareToggleModal}
			/>

			{/* Note Modal here */}
			<NoteModalCard
				visible={isNoteModal}
				onCancel={noteToggleModal}
				addHandler={noteToggleModal}
				cancelHandler={noteToggleModal}
				onBack={noteToggleModal}
			/>

			{/* Questions Modal */}
			<QuestionModal
				visible={isQuestionModal}
				addHandler={questionToggleModal}
				cancelHandler={questionToggleModal}
				onBack={questionToggleModal}
			/>

			<Popover
				content={toggleData}
				placement="topRight">
				<Button className="button-add-circle" shape="circle" type='primary' icon={<PlusOutlined />} />
			</Popover>

		</PrimaryLayout>
	)
}

export default GroupsScreen;