import { useState, useEffect } from 'react';
import { Button, Col, Menu, Row, Tabs, PageHeader, Spin } from 'antd';
import map from 'lodash/map';
import get from 'lodash/get';
import { useDispatch, useSelector } from 'react-redux';
import PrimaryLayout from '../../common/primaryLayout/primaryLayout';
import EmptyState from '../../common/emptyState/emptyState';

import ActiveQuizTab from '../../components/quiz/activeQuizTab';
import CompleteQuizTab from '../../components/quiz/completeQuizTab';
import QuizCard from '../../components/quiz/quizCard';
import { fetchUserQuizzes } from '../../redux/actions/quizActions';
import { fetchCollection } from '../../redux/actions/collectionActions';
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
  const [collectionDetails, setCollectionDetails] = useState(null);
  const rootCollection = useSelector((state) =>
    get(state, 'userState.user.rootCollection')
  );

  const fetchCollectionDetails = () => {
    setLoading(true);
    dispatch(fetchCollection(get(rootCollection, 'id')))
      .then((result: any) => {
        setCollectionDetails(result);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

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

  const [isQuizSelectModal, setIsQuizSelectModal] = useState({
    visible: false,
    data: null,
  });
  const quizSelectToggleModal = (data = null) => {
    setIsQuizSelectModal({
      visible: !get(isQuizSelectModal, 'visible'),
      data,
    });
  };

  const [isQuizResultModal, setIsQuizResultModal] = useState(false);
  const quizResultToggleModal = () => {
    setIsQuizResultModal(!isQuizResultModal);
    quizSelectToggleModal(null);
  };

  const getQuizzes = (page = 1, status = 0) => {
    setLoading(true);
    dispatch(
      fetchUserQuizzes({
        page,
        status,
        limit: 9,
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

  const refreshQuizData = () => {
    getQuizzes(1, 0);
    getQuizzes(1, 1);
  };

  useEffect(() => {
    refreshQuizData();
    fetchCollectionDetails();
  }, []);

  return (
    <PrimaryLayout>
      <div className="quiz-page-style">
        <Spin spinning={loading}>
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

          <div className="tab-section">
            <Tabs defaultActiveKey="1">
              <TabPane
                tab={`Active Quizes (${get(activeQuizzes, 'data', []).length})`}
                key="1"
              >
                {get(activeQuizzes, 'data', []).length > 0 && (
                  <ActiveQuizTab
                    quizzes={activeQuizzes}
                    onClickTakeQuiz={quizSelectToggleModal}
                    onClickPagination={(page: any) => {
                      getQuizzes(page, 0);
                    }}
                  />
                )}

                {get(activeQuizzes, 'data', []).length === 0 && (
                  <div className="state-center">
                    <EmptyState
                      imgUrl={folderGray}
                      buttonHandler={createQuizToggleModal}
                      title="Create Quiz"
                      description=" Your Create can be the folder under which all the study material is kept"
                      buttonText="Create Quiz"
                      buttonType="primary"
                    />
                  </div>
                )}
              </TabPane>

              <TabPane
                tab={`Completed Quizes (${
                  get(completeQuizzes, 'data', []).length
                })`}
                key="2"
              >
                {get(completeQuizzes, 'data', []).length > 0 && (
                  <CompleteQuizTab
                    quizzes={completeQuizzes}
                    onClickPagination={(page: any) => {
                      getQuizzes(page, 1);
                    }}
                  />
                )}

                {get(completeQuizzes, 'data', []).length === 0 && (
                  <div className="state-center">
                    <EmptyState
                      imgUrl={folderGray}
                      buttonHandler={createQuizToggleModal}
                      title="Create Quiz"
                      description=" Your Create can be the folder under which all the study material is kept"
                      buttonText="Create Quiz"
                      buttonType="primary"
                    />
                  </div>
                )}
              </TabPane>
            </Tabs>
          </div>
        </Spin>
      </div>

      {/* Questions Modal */}
      <CreateQuizModal
        visible={isCreateQuizModal}
        collections={get(collectionDetails, 'subCollections', [])}
        type="individual"
        onSuccess={() => {
          createQuizToggleModal();
          refreshQuizData();
        }}
        onCancel={createQuizToggleModal}
      />

      {/* Questions Modal */}
      {get(isQuizSelectModal, 'visible') && (
        <QuizSelectModal
          visible={get(isQuizSelectModal, 'visible')}
          saveHandler={quizSelectToggleModal}
          previusHandler={quizSelectToggleModal}
          onCancel={quizSelectToggleModal}
          quiz={get(isQuizSelectModal, 'data')}
          submitHandler={quizResultToggleModal}
          onSuccessSubmit={() => {
            quizSelectToggleModal();
            refreshQuizData();
          }}
        />
      )}

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
