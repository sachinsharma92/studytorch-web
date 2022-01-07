import { useState } from 'react';
import { Col, Menu, Row, Tabs, Select, PageHeader, Dropdown, Avatar } from 'antd';
import { EditOutlined, DeleteOutlined, UserOutlined, LoginOutlined } from '@ant-design/icons';

// Custom Component and Modal
import ROUTES from '../../router';
import PrimaryLayout from '../../common/primaryLayout/primaryLayout';
import NotesCard from '../../components/collection/notesCard/notesCard';
import FlashCard from '../../components/collection/flashCard/flashCard';
import ShareCollectionModal from '../../components/collection/modals/shareCollection';
import MasterCollectionModal from '../../components/collection/modals/masterCollection';
import ButtonCustom from '../../common/buttons/buttonCustom';
import QuestionCard from '../../components/collection/questionCard/questionCard';
import NoteModalCard from '../../components/collection/modals/noteModalCard';
import QuestionModal from '../../components/collection/modals/questionModal';
import RevisionModeModal from '../../components/collection/modals/revisionModeModal';
import QuestionAddedModal from '../../components/collection/modals/questionAddedModal';
import FlashEditModal from '../../components/collection/modals/flashEditModal';

// Images
import filter from "../../assets/images/icons/filter.svg";
import Users3 from "../../assets/images/icons/3-user.svg";
import arrowDown from "../../assets/images/icons/arrow-down.svg";

// Styles
import './styles.scss';
import SharedWithMeCollection from '../../components/sharedWithMeCollection';

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

const folderList = [
	{
		time: "Today",
		folders: [
			{
				folderName: "Maths",
				folderColor: "#6455CD",
				notes: "20",
				quizzes: "5",
				sharedBy: "Aakash"
			},
			{
				folderName: "Physics",
				folderColor: "#FCAB8E",
				notes: "0",
				quizzes: "5",
				sharedBy: "Aakash"
			},
			{
				folderName: "Chem",
				folderColor: "#FF8B8B",
				notes: "20",
				quizzes: "5",
				sharedBy: "Aakash"
			},
			{
				folderName: "Bio",
				folderColor: "#6FBEF6",
				notes: "20",
				quizzes: "5",
				sharedBy: "Aakash"
			}
		]
	},
]

function ShareWithMeDetails(props: any) {

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
		setIsQuestionAddedModal(false);
	};

	const [isQuestionAddedModal, setIsQuestionAddedModal] = useState(false);
	const questionAddedTpggleModal = () => {
		setIsQuestionAddedModal(!isQuestionAddedModal);
		setIsQuestionModal(false);
	};

	const [isFlashEditModal, setIsFlashEditModal] = useState(false);
	const flashEditModalTpggleModal = () => {
		setIsFlashEditModal(!isFlashEditModal);
	};

	const [isRevisionModeModal, setIsRevisionModeModal] = useState(false);
	const revisionModeToggle = () => {
		setIsRevisionModeModal(!isRevisionModeModal);
	};

	return (
		<PrimaryLayout>
			<div className="share-detail-page-style">

				<PageHeader
					className="site-page-header header-back"
					onBack={() => null}
					title="Maths"
					extra={[
						<div className="btn-section-top">
							<div className='user-flex-icon'>
								<Avatar shape="circle" size="small" icon={<UserOutlined />} />
								Shared by Ayush
							</div>
							<Dropdown placement="bottomRight" overlayClassName="collection-dropdown" overlay={
								<Menu>
									<Menu.Item icon={<DeleteOutlined />}>
										<a target="_blank" rel="noopener noreferrer" href="#">
											Delete Group
										</a>
									</Menu.Item>
									<Menu.Item icon={<LoginOutlined />}>
										<a>
											Leave Group
										</a>
									</Menu.Item>
								</Menu>
							}>
								<a className="ant-dropdown-link btn-outline-primary" onClick={e => e.preventDefault()}>
									<img src={Users3} className="icon-style" />
									Joined
									<img src={arrowDown} className="icon-style" />
								</a>
							</Dropdown>
						</div>
					]}
				/>

				<div className="tab-section">
					<Tabs defaultActiveKey="1">
						<TabPane tab="Collection" key="1">
								<Row gutter={32}>
									{
										folderList.map((data, index) => (
											<SharedWithMeCollection
												key={index}
												timeFilter={data.time}
												folders={data.folders}
											/>
										))
									}
								</Row>
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
							<div className="inline-button-section mb--20">
								<ButtonCustom className="round-primary" onClick={revisionModeToggle} title="Revision Mode" />
							</div>
							<RevisionModeModal
								visible={isRevisionModeModal}
								closeHandler={revisionModeToggle}
							/>
							<div className="card-section note-section">
								<Row gutter={32}>
									{flashCardData.map((data, index) => (
										<Col sm={8} key={index}>
											<FlashCard
												title={data.title}
												description={data.description}
												menuData={
													<Menu>
														<Menu.Item icon={<EditOutlined />}>
															<a onClick={flashEditModalTpggleModal}>
																Edit
															</a>
														</Menu.Item>
														<Menu.Item icon={<DeleteOutlined />}>
															<a target="_blank" rel="noopener noreferrer" href="#">
																Delete
															</a>
														</Menu.Item>
													</Menu>
												}
											/>
										</Col>
									))}
								</Row>

								<FlashEditModal
									visible={isFlashEditModal}
									btnAddHandler={flashEditModalTpggleModal}
									cancelHandler={flashEditModalTpggleModal}
									backHandler={flashEditModalTpggleModal}
								/>

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
				btnSubmitHandler={questionAddedTpggleModal}
				cancelHandler={questionToggleModal}
				onBack={questionToggleModal}
			/>

			<QuestionAddedModal
				visible={isQuestionAddedModal}
				buttonDoneHandler={questionAddedTpggleModal}
				addButtonHandler={questionToggleModal}
			/>

		</PrimaryLayout>
	)
}

export default ShareWithMeDetails;