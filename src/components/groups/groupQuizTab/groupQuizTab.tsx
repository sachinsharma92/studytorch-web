import { Tabs, Row, Spin } from 'antd';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import get from 'lodash/get';
import ButtonCustom from '../../../common/buttons/buttonCustom';
import ActiveQuizTab from '../../quiz/activeQuizTab';
import CompleteQuizTab from '../../quiz/completeQuizTab';
import { fetchUserGroupQuizzes } from '../../../redux/actions/quizActions';

const { TabPane } = Tabs;

const GroupQuizTab = (props: any) => {
  const { group } = props;
  const [isQuizSelectModal, setIsQuizSelectModal] = useState({
    visible: false,
    data: null,
  });
  const [isCreateQuizModal, setIsCreateQuizModal] = useState(false);

  const createQuizToggleModal = () => {
    setIsCreateQuizModal(!isCreateQuizModal);
  };

  const quizSelectToggleModal = (data = null) => {
    setIsQuizSelectModal({
      visible: !get(isQuizSelectModal, 'visible'),
      data,
    });
  };
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [activeQuizzes, setActiveQuiz] = useState({
    data: [],
    pagination: null,
  });

  const [completeQuizzes, setCompleteQuiz] = useState({
    data: [],
    pagination: null,
  });

  const getGroupQuizzes = (page = 1, status = 0) => {
    setLoading(true);
    dispatch(
      fetchUserGroupQuizzes(get(group, 'id'), {
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
    getGroupQuizzes(1, 0);
    getGroupQuizzes(1, 1);
  };

  useEffect(() => {
    refreshQuizData();
  }, []);

  return (
    <div className="card-section note-section">
      <Spin spinning={loading}>
        <div className="tab-section inner-tab-style">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Active Quizes (3)" key="1">
              <div className="inline-button-section">
                <ButtonCustom
                  className="round-primary"
                  title="Create Quiz"
                  onClick={createQuizToggleModal}
                />
              </div>
              {get(activeQuizzes, 'data', []).length > 0 && (
                <ActiveQuizTab
                  quizzes={activeQuizzes}
                  onClickTakeQuiz={quizSelectToggleModal}
                  onClickPagination={(page: any) => {
                    getGroupQuizzes(page, 0);
                  }}
                />
              )}
            </TabPane>

            <TabPane tab="Completed Quizes (2)" key="2">
              <div className="inline-button-section">
                <ButtonCustom
                  className="round-primary"
                  title="Create Quiz"
                  onClick={createQuizToggleModal}
                />
              </div>

              {get(completeQuizzes, 'data', []).length > 0 && (
                <CompleteQuizTab
                  quizzes={completeQuizzes}
                  onClickPagination={(page: any) => {
                    getGroupQuizzes(page, 1);
                  }}
                />
              )}
            </TabPane>
          </Tabs>
        </div>
      </Spin>
    </div>
  );
};

export default GroupQuizTab;
