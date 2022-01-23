import { useState } from 'react';
import { Button, Col, Menu, Row, Popover, Tabs, Select, PageHeader, Dropdown, Avatar, Pagination } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, LoginOutlined, CheckSquareOutlined } from '@ant-design/icons';

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
import QuestionAddedModal from '../../components/collection/modals/questionAddedModal';
import FlashEditModal from '../../components/collection/modals/flashEditModal';
import CollectionCard from '../../components/collection/collectionCard/collectionCard';
import RevisionModeModal from '../../components/collection/modals/revisionModeModal';
import GroupMemberModal from '../../components/groups/modals/groupMemberModal';
import ModalConfirmation from '../../common/modalConfirmation';
import QuizCard from '../../components/quiz/quizCard';

// Images
import filter from "../../assets/images/icons/filter.svg";
import Users3 from "../../assets/images/icons/3-user.svg";
import User from "../../assets/images/icons/user.svg";
import verticalDot from "../../assets/images/icons/vertical-dot.svg";
import arrowDown from "../../assets/images/icons/arrow-down.svg";
import heroBackground from "../../assets/images/banner-group.png";



// Styles
import './styles.scss';
import CreateQuizModal from '../../components/quiz/modals/createQuizModal';
import QuizReportCard from '../../components/quiz/quizReportCard';

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
		folderType: 'folderUser',
	},
	{
		title: "Maths",
		description: "20 Notes, 2 quizes",
		folderColor: "#6C5ECF",
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
		breadcrumbName: 'Group',
	},
	{
		path: 'first',
		breadcrumbName: 'Maths Group',
	},
];

const quizViewData = [
	{
		quizName: 'QUIZ NAME',
		collectionName: 'Collection name',
		date: '22nd Sep 2021',
		marks: '70%',
	},
	{
		quizName: 'QUIZ NAME',
		collectionName: 'Collection name',
		date: '22nd Sep 2021',
		marks: '70%',
	},
	{
		quizName: 'QUIZ NAME',
		collectionName: 'Collection name',
		date: '22nd Sep 2021',
		marks: '80%',
	},
	{
		quizName: 'QUIZ NAME',
		collectionName: 'Collection name',
		date: '22nd Sep 2021',
		marks: '90%',
	},
]


function GroupDetailScreen(props: any) {

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

	const [isGroupMemberModal, setIsGroupMemberModal] = useState(false);
	const groupMemberModalToggle = () => {
		setIsGroupMemberModal(!isGroupMemberModal);
	};

	const [isModalConfirmation, setIsModalConfirmation] = useState(false);
	const modalConfirmationToggle = () => {
		setIsModalConfirmation(!isModalConfirmation);
	};

	const [isModalDelete, setIsModalDelete] = useState(false);
	const modalDeleteToggle = () => {
		setIsModalDelete(!isModalDelete);
	};


	const [isCreateQuizModal, setIsCreateQuizModal] = useState(false);
	const createQuizToggleModal = () => {
		setIsCreateQuizModal(!isCreateQuizModal);
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
			<div className="group-page-style detail-page-style">

				<div className="hero-section" style={{ backgroundImage: `url(${heroBackground})` }}>
					<Button icon={<EditOutlined />} shape="round" size="middle" >
						edit
					</Button>
				</div>

				<PageHeader
					className="site-page-header header-back"
					onBack={() => null}
					title="Maths"
					breadcrumb={{ routes }}
					extra={[
						<div className="btn-section-top">
							<Dropdown placement="bottomRight" overlayClassName="collection-dropdown" overlay={
								<Menu>
									<Menu.Item icon={<DeleteOutlined />}>
										<a onClick={modalDeleteToggle}>
											Delete Group
										</a>
									</Menu.Item>
									<Menu.Item icon={<LoginOutlined />}>
										<a onClick={modalConfirmationToggle}>
											Leave Group
										</a>
									</Menu.Item>
								</Menu>
							}>
								<a className="ant-dropdown-link btn-outline-primary" onClick={e => e.preventDefault()}>
									<img src={Users3} className="icon-style" />
									<span>	Joined</span>
									<img src={arrowDown} className="icon-style" />
								</a>
							</Dropdown>

							<Button icon={<img src={User} className="img-white img-user" />} onClick={groupMemberModalToggle} shape="round" type="primary" size="large">
								Members
							</Button>

							<Dropdown overlayClassName="collection-dropdown" overlay={
								<Menu>
									<Menu.Item icon={<EditOutlined />}>
										<a href="#">
											Edit Group
										</a>
									</Menu.Item>
									<Menu.Item icon={<EditOutlined />}>
										<a href="#">
											Show Cover
										</a>
									</Menu.Item>
								</Menu>
							}>
								<a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
									<img src={verticalDot} className="icon-style" />
								</a>
							</Dropdown>
						</div>
					]}
				/>

				<div className="avatar-group">
					<Avatar.Group maxCount={5}>
						<Avatar src="https://media.istockphoto.com/photos/happy-hispanic-latin-gen-z-teen-girl-blogger-smiling-face-waving-hand-picture-id1225782570?b=1&k=20&m=1225782570&s=170667a&w=0&h=5ozC3Yy_DB95ShpzQEcUlon_mk0M6rHFP4qmMdJVSqA=" />
						<Avatar src="https://media.istockphoto.com/photos/happy-indian-woman-look-at-webcam-doing-job-interview-videochat-picture-id1198252585?b=1&k=20&m=1198252585&s=170667a&w=0&h=uaxDBZ35kKZfdgqZPql1mAeuLsAEHqjS3bM0Z6w8pJM=" />
						<Avatar src="https://media.istockphoto.com/photos/young-indian-woman-online-teacher-counselor-remote-tutor-or-job-at-picture-id1262282990?b=1&k=20&m=1262282990&s=170667a&w=0&h=WVxE2fsI6DfuL2TMrFQYsEUKVF-HbIJwOiv3BunD5h4=" />
						<Avatar src="https://media.istockphoto.com/photos/modern-woman-working-from-home-picture-id623295134?b=1&k=20&m=623295134&s=170667a&w=0&h=hgfKDsBKSrxC1sbFNDyV3ctMy1ocUYQKqq1Z-PbhCo4=" />
						<Avatar src="https://media.istockphoto.com/photos/smiling-attractive-young-lady-looking-talking-to-camera-at-home-picture-id1189198083?b=1&k=20&m=1189198083&s=170667a&w=0&h=UqbTLIDgMnE7glkhwibe2nzsZAloTZr_IakuzEDVTRE=" />
						<Avatar src="https://media.istockphoto.com/photos/africanamerican-man-talking-on-web-camera-video-call-headshot-picture-id918365128?b=1&k=20&m=918365128&s=170667a&w=0&h=jkB_KrGWA-mehC8upJXU5TMOhlrkSqAms8Sw34-2p4k=" />
						<Avatar src="https://media.istockphoto.com/photos/modern-woman-working-from-home-picture-id623295134?b=1&k=20&m=623295134&s=170667a&w=0&h=hgfKDsBKSrxC1sbFNDyV3ctMy1ocUYQKqq1Z-PbhCo4=" />
					</Avatar.Group>
				</div>

				<div className="tab-section">
					<Tabs defaultActiveKey="1">
						<TabPane tab="Collection" key="1">
							<div className="card-section">
								<Row gutter={32}>
									{cardData.map((data, index) => (
										<Col xs={24} sm={6} key={index}>
											<CollectionCard
												title={data.title}
												description={data.description}
												fillColor={data.folderColor}
												withUserStyle={data.folderType === 'folderUser' && true}
												menuData={menu}
												cardHandler="/group/member"
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

						<TabPane tab="Quiz" key="5">

							<div className="card-section note-section">
								<div className="tab-section">
									<Tabs defaultActiveKey="1">
										<TabPane tab="Active Quizes (3)" key="1">
											<div className='inline-button-section'>
												<ButtonCustom className="round-primary" title="Create Quiz" onClick={createQuizToggleModal} />
											</div>
											<div className="card-section">
												<Row gutter={32}>
													{quizViewData.map((data, index) => (
														<Col xs={24} sm={8} key={index}>
															<QuizCard
																quizName={data.quizName}
																collectionName={data.collectionName}
																date={data.date}
																quizComplete={false}
																menuData={
																	<Menu>
																		<Menu.Item icon={<DeleteOutlined />}>
																			<a href="#">
																				Edit
																			</a>
																		</Menu.Item>
																		<Menu.Item icon={<CheckSquareOutlined />}>
																			<a href="#">
																				Mark as Completed
																			</a>
																		</Menu.Item>
																	</Menu>
																}
															/>
														</Col>
													))}
												</Row>
												<div className="pagination-section">
													<Pagination defaultCurrent={1} total={50} />
												</div>
											</div>
										</TabPane>

										<TabPane tab="Completed Quizes (2)" key="2">
											<div className='inline-button-section'>
												<ButtonCustom className="round-primary" title="Create Quiz" onClick={createQuizToggleModal} />
											</div>
											<div className="card-section">
												<Row gutter={32}>
													{quizViewData.map((data, index) => (
														<Col sm={8} key={index}>
															<QuizCard
																quizName={data.quizName}
																collectionName={data.collectionName}
																date={data.date}
																quizComplete={true}
															/>
														</Col>
													))}
												</Row>
												<div className="pagination-section">
													<Pagination defaultCurrent={1} total={50} />
												</div>
											</div>
										</TabPane>
									</Tabs>
								</div>
							</div>
						</TabPane>


						<TabPane tab="Reports" key="6">
							<Row gutter={24}>
								<Col xs={12} sm={6}>
									<div className="card-outline">
										<div className="gray-box" />
										<div className='flex'>
											<h3 className="title-md">
												24
											</h3>
											<p className="description">
												Group Members
											</p>
										</div>
									</div>
								</Col>
								<Col xs={12} sm={6}>
									<div className="card-outline">
										<div className="gray-box" />
										<div className='flex'>
											<h3 className="title-md">
												12
											</h3>
											<p className="description">
												Total Collections
											</p>
										</div>
									</div>
								</Col>

								<Col xs={12} sm={6}>
									<div className="card-outline">
										<div className="gray-box" />
										<div className='flex'>
											<h3 className="title-md">
												10
											</h3>
											<p className="description">
												Total Quizes
											</p>
										</div>
									</div>
								</Col>

								<Col xs={12} sm={6}>
									<div className="card-outline">
										<div className="gray-box" />
										<div className='flex'>
											<h3 className="title-md">
												12.5 Hrs
											</h3>
											<p className="description">
												Group Studied
											</p>
										</div>
									</div>
								</Col>
							</Row>
							<div className="card-section report-section">
								<h3 className='title3'>Quiz Reports</h3>
								<Row gutter={32}>
									{quizViewData.map((data, index) => (
										<Col sm={8} key={index}>
											<QuizReportCard
												quizName={data.quizName}
												collectionName={data.collectionName}
												date={data.date}
												quizComplete={false}
												marks={data.marks}
												btnAddHandler={ROUTES.GROUP_SCORE_DETAILS_SCREEN}
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
				btnSubmitHandler={questionAddedTpggleModal}
				cancelHandler={questionToggleModal}
				onBack={questionToggleModal}
			/>

			<QuestionAddedModal
				visible={isQuestionAddedModal}
				buttonDoneHandler={questionAddedTpggleModal}
				addButtonHandler={questionToggleModal}
			/>

			{/* Share Modal here */}
			<GroupMemberModal
				visible={isGroupMemberModal}
				onCancel={groupMemberModalToggle}
				cancelHandler={groupMemberModalToggle}
				memberList
			/>

			<ModalConfirmation
				visible={isModalConfirmation}
				handleCancel={modalConfirmationToggle}
				handleLeave={modalConfirmationToggle}
				cancelTitle="Cancel"
				confirmTitle="Yes. Leave"
			>
				<div className="confirmation-section">
					<h2>
						Are you sure you want to leave the
					</h2>
					<h2 className="theme-color">
						Maths Group <span>?</span>
					</h2>
				</div>
			</ModalConfirmation>

			<ModalConfirmation
				visible={isModalDelete}
				handleCancel={modalDeleteToggle}
				handleLeave={modalDeleteToggle}
				wrapClassName="delete-modal-style"
				cancelTitle="Cancel"
				confirmTitle="Yes. Delete"
			>
				<div className="confirmation-section">
					<h2>
						Are you sure you want to delete this Group!
					</h2>
				</div>
			</ModalConfirmation>

			{/* Questions Modal */}
			<CreateQuizModal
				visible={isCreateQuizModal}
				createHandler={createQuizToggleModal}
				cancelHandler={createQuizToggleModal}
				onCancel={createQuizToggleModal}
			/>

			<Popover
				content={toggleData}
				placement="topRight">
				<Button className="button-add-circle" shape="circle" type='primary' icon={<PlusOutlined />} />
			</Popover>

		</PrimaryLayout>
	)
}

export default GroupDetailScreen
	;