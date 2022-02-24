import { useState, useEffect } from 'react';
import { Button, Col, Menu, Row, Tabs, PageHeader, Pagination } from 'antd';
import map from 'lodash/map';
import get from 'lodash/get';
import { useDispatch } from 'react-redux';
import PrimaryLayout from '../../common/primaryLayout/primaryLayout';
import EmptyState from '../../common/emptyState/emptyState';

import ActiveQuizTab from '../../components/quiz/activeQuizTab';
import CompleteQuizTab from '../../components/quiz/completeQuizTab';
import QuizCard from '../../components/quiz/quizCard';
import { fetchUserQuizzes } from '../../redux/actions/quizActions';
// Images
import folderGray from '../../assets/images/icons/folder-gray.svg';

// Styles
import './styles.scss';
import CreateQuizModal from '../../components/quiz/modals/createQuizModal';
import QuizResultModal from '../../components/quiz/modals/quizResultModal';
import QuizSelectModal from '../../components/quiz/modals/quizSelectModal';

const { TabPane } = Tabs;

function QuizScreen(props: any) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isCreateQuizModal, setIsCreateQuizModal] = useState(false);
  const [activeQuizzes, setActiveQuiz] = useState({
    data: [],
    pagination: null,
  });

  const [completeQuizzes, setCompleteQuiz] = useState({
    data: [],
    pagination: null,
  });
  const createQuizToggleModal = () => {
    setIsCreateQuizModal(!isCreateQuizModal);
  };

  const [isQuizSelectModal, setIsQuizSelectModal] = useState(false);
  const quizSelectToggleModal = () => {
    setIsQuizSelectModal(!isQuizSelectModal);
  };

  const [isQuizResultModal, setIsQuizResultModal] = useState(false);
  const quizResultToggleModal = () => {
    setIsQuizResultModal(!isQuizResultModal);
    setIsQuizSelectModal(false);
  };

  const getQuizzes = (page = 1, status = 0) => {
    setLoading(true);
    dispatch(
      fetchUserQuizzes({
        page,
        status,
      })
    )
      .then((result: any) => {
        setLoading(false);

        if (status === 0) {
          setActiveQuiz({
            data: get(result, 'data'),
            pagination: get(result, 'meta.pagination'),
          });
        } else {
          setCompleteQuiz({
            data: get(result, 'data'),
            pagination: get(result, 'meta.pagination'),
          });
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getQuizzes(1, 0);
    getQuizzes(1, 1);
  }, []);

  console.log('======>', activeQuizzes, completeQuizzes);

  return (
    <PrimaryLayout>
      <div className="quiz-page-style">
        <PageHeader
          className="site-page-header header-back"
          title="Quiz"
          extra={[
            <Button
              onClick={createQuizToggleModal}
              shape="round"
              size="large"
              type="primary"
            >
              Create Quiz
            </Button>,
          ]}
        />

        {props.collectionData ? (
          <div className="state-center">
            <EmptyState
              imgUrl={folderGray}
              title="Create Quiz"
              description=" Your Create can be the folder underwhich all the study material is kept"
              buttonText="Create Quiz"
              buttonType="primary"
            />
          </div>
        ) : (
          <div className="tab-section">
            <Tabs defaultActiveKey="1">
              <TabPane
                tab={`Active Quizes (${get(activeQuizzes, 'data', []).length})`}
                key="1"
              >
                <ActiveQuizTab quizzes={activeQuizzes} />
              </TabPane>

              <TabPane
                tab={`Completed Quizes (${
                  get(completeQuizzes, 'data', []).length
                })`}
                key="2"
              >
                <CompleteQuizTab quizzes={completeQuizzes} />
              </TabPane>
            </Tabs>
          </div>
        )}
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
  );
}

export default QuizScreen;
