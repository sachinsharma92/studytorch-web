import { Tabs, Spin } from "antd";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import get from "lodash/get";
import EmptyState from "../../../common/emptyState/emptyState";
import ButtonCustom from "../../../common/buttons/buttonCustom";
import noDataImage from "../../../assets/images/study-not-data.svg";
import ActiveQuizTab from "../../quiz/activeQuizTab";
import CompleteQuizTab from "../../quiz/completeQuizTab";
import { fetchUserGroupQuizzes } from "../../../redux/actions/quizActions";
import QuizSelectModal from "../../quiz/modals/quizSelectModal";
import QuizResultModal from "../../quiz/modals/quizResultModal";
import CreateGroupQuiz from "../../quiz/modals/createGroupQuiz";

const { TabPane } = Tabs;

const GroupQuizTab = (props: any) => {
  const { group, collectionDetails, toggleCheckSolution } = props;
  const [isQuizSelectModal, setIsQuizSelectModal] = useState({
    visible: false,
    data: null,
  });
  const [isCreateQuizModal, setIsCreateQuizModal] = useState(false);
  const [isQuizResultModal, setIsQuizResultModal] = useState({
    visible: false,
    data: null,
  });

  const createQuizToggleModal = () => {
    setIsCreateQuizModal(!isCreateQuizModal);
  };

  const quizSelectToggleModal = (data = null) => {
    setIsQuizSelectModal({
      visible: !get(isQuizSelectModal, "visible"),
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
      fetchUserGroupQuizzes(get(group, "id"), {
        page,
        status,
        limit: 9,
      })
    )
      .then((result: any) => {
        setLoading(false);
        if (status === 0) {
          setActiveQuiz({
            data: get(result, "data"),
            pagination: get(result, "meta.pagination"),
          });
        } else {
          setCompleteQuiz({
            data: get(result, "data"),
            pagination: get(result, "meta.pagination"),
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
            <TabPane
              tab={`Active Quizzes (${get(activeQuizzes, "data", []).length})`}
              key="1"
            >
              <div className="inline-button-section">
                {get(group, "is_group_admin") && (
                  <ButtonCustom
                    className="round-primary"
                    title="Create Quiz"
                    onClick={createQuizToggleModal}
                  />
                )}
              </div>
              {get(activeQuizzes, "data", []).length > 0 && (
                <ActiveQuizTab
                  quizzes={activeQuizzes}
                  onClickTakeQuiz={quizSelectToggleModal}
                  onClickPagination={(page: any) => {
                    getGroupQuizzes(page, 0);
                  }}
                />
              )}

              {get(activeQuizzes, "data", []).length === 0 && (
                <EmptyState
                  imgUrl={noDataImage}
                  buttonHandler={createQuizToggleModal}
                  title="No Active Quiz for this group"
                  imgStyle="empty-image"
                />
              )}
            </TabPane>

            <TabPane
              tab={`Completed Quizzes (${
                get(completeQuizzes, "data", []).length
              })`}
              key="2"
            >
              <div className="inline-button-section">
                {get(group, "is_group_admin") && (
                  <ButtonCustom
                    className="round-primary"
                    title="Create Quiz"
                    onClick={createQuizToggleModal}
                  />
                )}
              </div>

              {get(completeQuizzes, "data", []).length > 0 && (
                <CompleteQuizTab
                  toggleCheckSolution={toggleCheckSolution}
                  quizzes={completeQuizzes}
                  onClickPagination={(page: any) => {
                    getGroupQuizzes(page, 1);
                  }}
                />
              )}

              {get(completeQuizzes, "data", []).length === 0 && (
                <EmptyState
                  imgUrl={noDataImage}
                  buttonHandler={createQuizToggleModal}
                  title="No Completed Quiz for this group"
                  imgStyle="empty-image"
                />
              )}
            </TabPane>
          </Tabs>
        </div>
      </Spin>

      {isCreateQuizModal && (
        <CreateGroupQuiz
          visible={isCreateQuizModal}
          collections={[collectionDetails]}
          group={group}
          members={get(group, "group_members", [])}
          type="individual"
          onSuccess={() => {
            createQuizToggleModal();
            refreshQuizData();
          }}
          onCancel={createQuizToggleModal}
        />
      )}

      {get(isQuizSelectModal, "visible") && (
        <QuizSelectModal
          visible={get(isQuizSelectModal, "visible")}
          saveHandler={quizSelectToggleModal}
          previusHandler={quizSelectToggleModal}
          onCancel={quizSelectToggleModal}
          quiz={get(isQuizSelectModal, "data")}
          refreshQuizData={() => refreshQuizData()}
          onSuccessSubmit={(quiz: any) => {
            quizSelectToggleModal();
            setIsQuizResultModal({ visible: true, data: quiz });
            refreshQuizData();
          }}
        />
      )}

      {get(isQuizResultModal, "visible") && (
        <QuizResultModal
          visible={get(isQuizResultModal, "visible")}
          quiz={get(isQuizResultModal, "data")}
          onCancel={() => setIsQuizResultModal({ visible: false, data: null })}
        />
      )}
    </div>
  );
};

export default GroupQuizTab;
