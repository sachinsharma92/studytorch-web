import { useState } from 'react';
import { Button, Col, Menu, Row, Tabs, PageHeader, Pagination } from 'antd';
import { EditOutlined, DeleteOutlined, UserAddOutlined, InfoCircleOutlined, } from '@ant-design/icons';
import PrimaryLayout from '../../common/primaryLayout/primaryLayout';
import EmptyState from '../../common/emptyState/emptyState';
import QuizCard from '../../components/quiz/quizCard';

// Images
import folderGray from "../../assets/images/icons/folder-gray.svg";

// Styles
import './styles.scss';
import CreateQuizModal from '../../components/quiz/modals/createQuizModal';
import QuizResultModal from '../../components/quiz/modals/quizResultModal';
import QuizSelectModal from '../../components/quiz/modals/quizSelectModal';


const { TabPane } = Tabs;


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

const quizViewData = [
	{
		quizName: 'QUIZ NAME',
		collectionName: 'Collection name',
		date: '22nd Sep 2021'
	},
	{
		quizName: 'QUIZ NAME',
		collectionName: 'Collection name',
		date: '22nd Sep 2021'
	},
	{
		quizName: 'QUIZ NAME',
		collectionName: 'Collection name',
		date: '22nd Sep 2021'
	},
	{
		quizName: 'QUIZ NAME',
		collectionName: 'Collection name',
		date: '22nd Sep 2021'
	},
	{
		quizName: 'QUIZ NAME',
		collectionName: 'Collection name',
		date: '22nd Sep 2021'
	},
	{
		quizName: 'QUIZ NAME',
		collectionName: 'Collection name',
		date: '22nd Sep 2021'
	},
	{
		quizName: 'QUIZ NAME',
		collectionName: 'Collection name',
		date: '22nd Sep 2021'
	},
	{
		quizName: 'QUIZ NAME',
		collectionName: 'Collection name',
		date: '22nd Sep 2021'
	},
]

function QuizScreen(props: any) {

	const [isCreateQuizModal, setIsCreateQuizModal] = useState(false);
	const createQuizToggleModal= () => {
		setIsCreateQuizModal(!isCreateQuizModal);
	};

	const [isQuizSelectModal, setIsQuizSelectModal] = useState(false);
	const quizSelectToggleModal= () => {
		setIsQuizSelectModal(!isQuizSelectModal);
	};

	const [isQuizResultModal, setIsQuizResultModal] = useState(false);
	const quizResultToggleModal= () => {
		setIsQuizResultModal(!isQuizResultModal);
		setIsQuizSelectModal(false);
	};



	return (
		<PrimaryLayout>
			<div className="quiz-page-style">

				<PageHeader
					className="site-page-header header-back"
					title="Quiz"
					extra={[
						<Button onClick={createQuizToggleModal} shape="round" size="large" type="primary">
							Create Quiz
						</Button>
					]}
				/>

				{props.collectionData ?
				<div className="state-center">
					<EmptyState
						imgUrl={folderGray}
						title="Create Quiz"
						description=" Your Create can be the folder underwhich all the study material is kept"
						buttonText="Create Quiz"
						buttonType="primary"
					/>
				</div>
					:

					<div className="tab-section">
						<Tabs defaultActiveKey="1">
							<TabPane tab="Active Quizes (3)" key="1">
								<div className="card-section">
									<Row gutter={32}>
										{quizViewData.map((data, index) => (
											<Col xs={24} sm={8} key={index}>
												<QuizCard
													quizName={data.quizName}
													collectionName={data.collectionName}
													date={data.date}
													quizComplete={false}
													onClick={quizSelectToggleModal}
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
				}

			</div>

			
			{/* Questions Modal */}
			<CreateQuizModal
				visible={isCreateQuizModal}
				createHandler={createQuizToggleModal}
				cancelHandler={createQuizToggleModal}
				onCancel={createQuizToggleModal}
			/>

			{/* Questions Modal */}
			<QuizSelectModal
				visible={isQuizSelectModal}
				saveHandler={quizSelectToggleModal}
				previusHandler={quizSelectToggleModal}
				onCancel={quizSelectToggleModal}
				submitHandler={quizResultToggleModal}
			/>

			{/* Questions Modal */}
			<QuizResultModal
				visible={isQuizResultModal}
				buttonHandler={quizResultToggleModal}
				onBack={quizResultToggleModal}
				onCancel={quizResultToggleModal}
			/>

		</PrimaryLayout>
	)
}

export default QuizScreen;