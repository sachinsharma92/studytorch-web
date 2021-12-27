import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Menu, Row, Popover, Tabs, Select, PageHeader } from 'antd';
import PrimaryLayout from '../../common/primaryLayout/primaryLayout';
import { PlusOutlined, EditOutlined, DeleteOutlined, ShareAltOutlined } from '@ant-design/icons';
import NotesCard from '../../components/collection/notesCard/notesCard';
import FlashCard from '../../components/collection/flashCard/flashCard';
import ROUTES from '../../router';
import ShareCollectionModal from '../../components/collection/modals/shareCollection';
import MasterCollectionModal from '../../components/collection/modals/masterCollection';
import ButtonCustom from '../../common/buttons/buttonCustom';

// Images
import filter from "../../assets/images/icons/filter.svg";
import folderPurple from "../../assets/images/icons/folder-purple.svg";
import coralFolder from "../../assets/images/icons/coral-folder.svg";
import blueFolder from "../../assets/images/icons/folder-1.svg";
import folderPurpleUsers from "../../assets/images/icons/folder-purple-with-users.svg";
import babyPinkFolder from "../../assets/images/icons/baby-pink-folder.svg";
import CollectionCard from '../../components/collection/collectionCard/collectionCard';

// Styles
import './styles.scss';
import QuestionCard from '../../components/collection/questionCard/questionCard';
import NoteModalCard from '../../components/collection/modals/noteModalCard';
import QuestionModal from '../../components/collection/modals/questionModal';

const { TabPane } = Tabs;

const { Option } = Select;

const menu = (
	<Menu>
		<Menu.Item icon={<EditOutlined />}>
			<a target="_blank" rel="noopener noreferrer" href="#">
				Edit
			</a>
		</Menu.Item>
		<Menu.Item icon={<DeleteOutlined />}>
			<a target="_blank" rel="noopener noreferrer" href="#">
				Delete
			</a>
		</Menu.Item>
	</Menu>
);

const cardData = [
	{
		title: "Maths",
		description: "20 Notes, 2 quizes",
		imgUrl: folderPurple,
	},
	{
		title: "Maths",
		description: "20 Notes, 2 quizes",
		imgUrl: babyPinkFolder,
	},
	{
		title: "Maths",
		description: "20 Notes, 2 quizes",
		imgUrl: blueFolder,
	},
	{
		title: "Maths",
		description: "20 Notes, 2 quizes",
		imgUrl: coralFolder,
	},
	{
		title: "Maths",
		description: "20 Notes, 2 quizes",
		imgUrl: folderPurple,
	},
	{
		title: "Maths",
		description: "20 Notes, 2 quizes",
		imgUrl: folderPurple,
	},
	{
		title: "Maths",
		description: "20 Notes, 2 quizes",
		imgUrl: folderPurpleUsers,
	},
	{
		title: "Maths",
		description: "20 Notes, 2 quizes",
		imgUrl: folderPurple,
	},
]

const noteCardData = [
	{
		title: "Headline label",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing  elit fringilla vitae...",
		tag: 'Tag 1',
	},
	{
		title: "Headline label",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing  elit fringilla vitae...",
		tag: 'Tag 1',
	},
	{
		title: "Headline label",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing  elit fringilla vitae...",
		tag: 'Tag 1',
	},
	{
		title: "Headline label",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing  elit fringilla vitae...",
		tag: 'Tag 1',
	},
	{
		title: "Headline label",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing  elit fringilla vitae...",
		tag: 'Tag 1',
	},
	{
		title: "Headline label",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing  elit fringilla vitae...",
		tag: 'Tag 1',
	},
	{
		title: "Headline label",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing  elit fringilla vitae...",
		tag: 'Tag 1',
	},
	{
		title: "Headline label",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing  elit fringilla vitae...",
		tag: 'Tag 1',
	},
]

const flashCardData = [
	{
		title: "Headline label",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing  elit fringilla vitae...",
		tag: 'Tag 1',
	},
	{
		title: "Headline label",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing  elit fringilla vitae...",
		tag: 'Tag 1',
	},
	{
		title: "Headline label",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing  elit fringilla vitae...",
		tag: 'Tag 1',
	},
	{
		title: "Headline label",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing  elit fringilla vitae...",
		tag: 'Tag 1',
	},
	{
		title: "Headline label",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing  elit fringilla vitae...",
		tag: 'Tag 1',
	},
	{
		title: "Headline label",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing  elit fringilla vitae...",
		tag: 'Tag 1',
	},
	{
		title: "Headline label",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing  elit fringilla vitae...",
		tag: 'Tag 1',
	},
	{
		title: "Headline label",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing  elit fringilla vitae...",
		tag: 'Tag 1',
	},
]

const questionCardData = [
	{
		tag: 'Objective  MCQ',
		questionTitle: "Question title goes here .............................",
	},
	{
		tag: 'Objective',
		questionTitle: "Question title goes here .............................",
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac dignissim urna risus  dolor'
	},
]

const routes = [
	{
		path: 'index',
		breadcrumbName: 'Collections',
	},
	{
		path: 'first',
		breadcrumbName: 'Maths',
	},
];

function CollectionDetails(props: any) {

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

				<PageHeader
					className="site-page-header header-back"
					onBack={() => null}
					title="Maths"
					breadcrumb={{ routes }}
					extra={[
						<Button icon={<ShareAltOutlined />} onClick={shareToggleModal} shape="round" type="primary">
							Share
						</Button>,
					]}
				/>

				<div className="tab-section">
					<Tabs defaultActiveKey="1">
						<TabPane tab="Collection" key="1">
							<div className="card-section">
								<Row gutter={32}>
									{cardData.map((data, index) => (
										<Col sm={6} key={index}>
											<CollectionCard
												title={data.title}
												description={data.description}
												imgUrl={data.imgUrl}
												menuData={menu}
												cardHandler="/"
											/>
										</Col>
									))}
								</Row>
							</div>
						</TabPane>
						<TabPane tab="Notes" key="2">
							<div className="card-section note-section">
								<Row gutter={32}>
									{noteCardData.map((data, index) => (
										<Col sm={8} key={index}>
											<NotesCard
												title={data.title}
												description={data.description}
												menuData={menu}
												cardHandler="/"
												tag={data.tag}
											/>
										</Col>
									))}
								</Row>
							</div>
						</TabPane>
						<TabPane tab="Question" key="3">

							<div className="inline-button-section mt--20 mb--30">
								<ButtonCustom className="round-primary" title="Take a Quiz" />
								<ButtonCustom className="round-primary" icon={<img src={filter} alt="" />} title="Filter" />
							</div>

							<div className="card-section note-section">
								<Row gutter={32}>
									{questionCardData.map((data, index) => (
										<Col sm={12} key={index}>
											<QuestionCard
												questionTitle={data.questionTitle}
												tag={data.tag}
												menuData={menu}
												description={data.description}
											/>
										</Col>
									))}
								</Row>
							</div>

						</TabPane>
						<TabPane tab="Flash Card" key="4">
							<div className="inline-button-section mt--20">
								<ButtonCustom className="round-primary" title="Revision Mode" />
							</div>
							<div className="card-section note-section">
								<Row gutter={32}>
									{flashCardData.map((data, index) => (
										<Col sm={8} key={index}>
											<FlashCard
												title={data.title}
												description={data.description}
												menuData={menu}
											/>
										</Col>
									))}
								</Row>
							</div>
						</TabPane>
					</Tabs>
				</div>
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

export default CollectionDetails;