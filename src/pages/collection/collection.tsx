import { useState } from 'react';
import { Button, Col, Menu, Row, Popover, } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UserAddOutlined, InfoCircleOutlined } from '@ant-design/icons';
import ROUTES from '../../router';
import PrimaryLayout from '../../common/primaryLayout/primaryLayout';
import EmptyState from '../../common/emptyState/emptyState';
import CollectionCard from '../../components/collection/collectionCard/collectionCard';
import MasterCollectionModal from '../../components/collection/modals/masterCollection';
import ShareCollectionModal from '../../components/collection/modals/shareCollection';
import NoteModalCard from '../../components/collection/modals/noteModalCard';
import QuestionModal from '../../components/collection/modals/questionModal';

// Images
import folderGray from "../../assets/images/icons/folder-gray.svg";

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
		title: "Maths",
		description: "20 Notes, 2 quizes",
		folderColor: "#6C5ECF",
	},
	{
		title: "Maths",
		description: "20 Notes, 2 quizes",
		folderColor: "#FCAB8E",
	},
	{
		title: "Maths",
		description: "20 Notes, 2 quizes",
		folderColor: "#6FBEF6",
	},
	{
		title: "Maths",
		description: "20 Notes, 2 quizes",
		folderColor: "#FF8B8B",
	},
	{
		title: "Maths",
		description: "20 Notes, 2 quizes",
		folderColor: "#503FC8",
	},
	{
		title: "Maths",
		description: "20 Notes, 2 quizes",
		folderColor: "#FCAB8E",
	},
	{
		title: "Maths",
		description: "20 Notes, 2 quizes",
		folderColor: "#6C5ECF",
		folderType:'folderUser',
	},
	{
		title: "Maths",
		description: "20 Notes, 2 quizes",
		folderColor: "#6C5ECF",
	},
]

function CollectionScreen(props: any) {

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
				<h3 className="title3">My Collection</h3>

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
						<Row gutter={{ xs: 0, sm: 32, md: 32, lg: 32 }}>
							{cardData.map((data, index) => (
								<Col xs={24} sm={6} key={index}>
									<CollectionCard
										title={data.title}
										description={data.description}
										fillColor={data.folderColor}
										withUserStyle={data.folderType === 'folderUser' && true}
										menuData={menu}
										cardHandler={ROUTES.COLLECTION_DETAILS_SCREEN}
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

export default CollectionScreen;