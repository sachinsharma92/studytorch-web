import { useEffect, useState } from 'react';
import { Col, Row, Spin, Modal, message } from 'antd';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import map from 'lodash/map';
import get from 'lodash/get';
import ROUTES from '../../router';
import PrimaryLayout from '../../common/primaryLayout/primaryLayout';
import EmptyState from '../../common/emptyState/emptyState';
import GroupsCard from '../../components/groups/groupsCard/groupsCard';
import ButtonCustom from '../../common/buttons/buttonCustom';
import GroupCreateModal from '../../components/groups/modals/groupCreateModal';
import {
  getUserGroups,
  deleteGroup,
  leaveGroup,
} from '../../redux/actions/groupActions';
import {
  DELETE_GROUP_SUCCESS,
  LEAVE_GROUP_SUCCESS,
} from '../../constants/messages';

// Images
import folderGray from '../../assets/images/icons/folder-gray.svg';

// Styles
import './styles.scss';

const { confirm } = Modal;

function GroupsScreen(props: any) {
  const dispatch = useDispatch();

  const [groupModal, setGroupModal] = useState<any>({
    visible: false,
    data: null,
  });

  const [groups, setGroups] = useState([]);

  const [loading, setLoading] = useState(false);

  const toggleGroupModal = (data = null) => {
    setGroupModal({
      data,
      visible: !get(groupModal, 'visible'),
    });
  };

  const getGroups = () => {
    setLoading(true);
    dispatch(getUserGroups())
      .then((result: any) => {
        setLoading(false);
        setGroups(result);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onCreateSuccess = () => {
    toggleGroupModal(null);
    getGroups();
  };

  const onClickDelete = (id: any) => {
    setLoading(true);
    dispatch(deleteGroup(id))
      .then(() => {
        message.success(DELETE_GROUP_SUCCESS);
        getGroups();
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onLeaveGroup = (id: any) => {
    setLoading(true);
    dispatch(leaveGroup(id))
      .then(() => {
        message.success(LEAVE_GROUP_SUCCESS);
        getGroups();
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onConfirmDelete = (id: any) => {
    confirm({
      title: 'Do you Want to delete this Group?',
      icon: <ExclamationCircleOutlined />,

      onOk() {
        onClickDelete(id);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const onConfirmLeave = (id: any) => {
    confirm({
      title: 'Do you Want to leave this Group?',
      icon: <ExclamationCircleOutlined />,

      onOk() {
        onLeaveGroup(id);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <PrimaryLayout>
      <Spin spinning={loading}>
        <div className="group-page-style">
          <h3 className="title3">Groups</h3>

          {props.collectionData ? (
            <div className="state-center">
              <EmptyState
                imgUrl={folderGray}
                title="Create your Collection"
                description=" Your Collection can be the folder underwhich all the study material is kept"
                buttonText="Add Collection"
                buttonType="primary"
              />
            </div>
          ) : (
            <div className="card-section">
              <Row gutter={32}>
                {map(groups, (group, index) => (
                  <Col xs={24} sm={8} key={index}>
                    <GroupsCard
                      group={group}
                      onEditGroup={toggleGroupModal}
                      onDelete={onConfirmDelete}
                      onLeaveGroup={onConfirmLeave}
                    />
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </div>

        {/* Group Modal here */}
        <GroupCreateModal
          visible={get(groupModal, 'visible')}
          onCancel={() => toggleGroupModal()}
          onSuccess={onCreateSuccess}
          edit={get(groupModal, 'data') ? true : false}
          initialValue={get(groupModal, 'data')}
        />

        <ButtonCustom
          onClick={() => {
            toggleGroupModal();
          }}
          icon={<PlusOutlined />}
          title="Create Group"
          type="primary"
          btnContainer="group-btn-add"
        />
      </Spin>
    </PrimaryLayout>
  );
}

export default GroupsScreen;
