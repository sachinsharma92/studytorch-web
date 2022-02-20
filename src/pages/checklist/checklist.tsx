import { useState, useEffect } from 'react';
import { Button, Col, PageHeader, Row, Spin, message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import map from 'lodash/map';
import get from 'lodash/get';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import PrimaryLayout from '../../common/primaryLayout/primaryLayout';
import EmptyState from '../../common/emptyState/emptyState';
import { fetchUserChecklist } from '../../redux/actions/checklistActions';
// Images
import noDataImage from '../../assets/images/study-not-data.svg';
import {
  deleteChecklist,
  createTaskToCheckList,
  updateTaskStatusToCheckList,
  archiveChecklist,
} from '../../redux/actions/checklistActions';
import {
  DELETE_CHECKLIST_SUCCESS,
  CREATE_CHECKLIST_TASK_SUCCESS,
  UPDATE_CHECKLIST_TASK_SUCCESS,
} from '../../constants/messages';
// Styles
import './styles.scss';
import AddChecklist from '../../components/checklist/modals/addChecklist';
import ChecklistCard from '../../components/checklist/checklistCard';

const { confirm } = Modal;

function ChecklistScreen(props: any) {
  const dispatch = useDispatch();
  const [isChecklistAddModal, setIsChecklistAddModal] = useState({
    visible: false,
    data: null,
  });
  const [checkLists, setCheckList] = useState([]);
  const [loading, setLoading] = useState(false);

  const checklistAddToggleModal = (data = null) => {
    setIsChecklistAddModal({
      visible: !get(isChecklistAddModal, 'visible'),
      data,
    });
  };

  const getUserCheckList = () => {
    setLoading(true);
    dispatch(fetchUserChecklist())
      .then((result: any) => {
        setCheckList(result);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getUserCheckList();
  }, []);

  const onDeleteChecklist = (id: any) => {
    setLoading(true);
    dispatch(deleteChecklist(id))
      .then(() => {
        setLoading(false);
        message.success(DELETE_CHECKLIST_SUCCESS);
        getUserCheckList();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onConfirmDelete = (id: any) => {
    confirm({
      title: 'Do you Want to delete this Checklist?',
      icon: <ExclamationCircleOutlined />,

      onOk() {
        onDeleteChecklist(id);
      },
      onCancel() {},
    });
  };

  const addTaskToCheckList = (id: any, payload: any) => {
    setLoading(true);
    dispatch(createTaskToCheckList(id, payload))
      .then(() => {
        setLoading(false);
        message.success(CREATE_CHECKLIST_TASK_SUCCESS);
        getUserCheckList();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const updateTask = (id: any, task_id: any, payload: any) => {
    setLoading(true);
    dispatch(updateTaskStatusToCheckList(id, task_id, payload))
      .then(() => {
        setLoading(false);
        message.success(UPDATE_CHECKLIST_TASK_SUCCESS);
        getUserCheckList();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onArchiveChecklist = (id: any) => {
    setLoading(true);
    dispatch(archiveChecklist(id))
      .then(() => {
        setLoading(false);
        message.success(UPDATE_CHECKLIST_TASK_SUCCESS);
        getUserCheckList();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <PrimaryLayout>
      <div className="checklist-page-style">
        <Spin spinning={loading}>
          <PageHeader
            className="site-page-header header-back"
            title="Study Checklist"
          />

          {checkLists.length === 0 ? (
            <div className="state-center">
              <EmptyState
                imgUrl={noDataImage}
                title="Start your study plan"
                buttonText="Add Checklist"
                buttonType="primary"
                imgStyle="empty-image"
                buttonHandler={() => checklistAddToggleModal()}
              />
            </div>
          ) : (
            <div className="checklist-section">
              <Row gutter={22}>
                {map(checkLists, (checklist, index) => (
                  <Col xs={24} sm={8} key={index}>
                    <ChecklistCard
                      onEditChecklist={(c: any) => {
                        checklistAddToggleModal(c);
                      }}
                      onArchiveChecklist={onArchiveChecklist}
                      updateTask={updateTask}
                      addTaskToCheckList={addTaskToCheckList}
                      checklist={checklist}
                      onConfirmDelete={onConfirmDelete}
                    />
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </Spin>
      </div>

      {/* Questions Modal */}
      {get(isChecklistAddModal, 'visible') && (
        <AddChecklist
          visible={get(isChecklistAddModal, 'visible')}
          addHandler={checklistAddToggleModal}
          cancelHandler={checklistAddToggleModal}
          onCancel={checklistAddToggleModal}
          edit={get(isChecklistAddModal, 'data') ? true : false}
          initialValues={get(isChecklistAddModal, 'data')}
          onSuccess={() => {
            getUserCheckList();
            checklistAddToggleModal();
          }}
        />
      )}

      <Button
        onClick={() => {
          checklistAddToggleModal();
        }}
        className="button-add-circle"
        shape="circle"
        type="primary"
        icon={<PlusOutlined />}
      />
    </PrimaryLayout>
  );
}

export default ChecklistScreen;
