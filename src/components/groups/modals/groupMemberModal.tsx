import {
  Avatar,
  Button,
  List,
  Modal,
  message,
  Popconfirm,
  Row,
  Col,
  Typography,
  Spin,
  Input,
  Tag,
  notification,
  Drawer,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import get from 'lodash/get';
import find from 'lodash/find';
import upperCase from 'lodash/upperCase';
import {
  addMemberToGroup,
  removeMemberToGroup,
  fetchInvitedGroupMember,
} from '../../../redux/actions/groupActions';
import { cancelInvitation } from '../../../redux/actions/userActions';
import {
  GROUP_MEMBER_UPDATED_SUCCESS,
  GROUP_MEMBER_REMOVED_SUCCESS,
} from '../../../constants/messages';
import { DeleteOutlined } from '@ant-design/icons';
import UserProgress from '../../../components/userProgress';

// Styles
import './styles.scss';
import { useState, useEffect } from 'react';
import { map } from 'lodash';

const { Text } = Typography;

function GroupMemberModal(props: any) {
  const { groupDetails, refreshGroupDetails } = props;
  const dispatch = useDispatch();
  const adminUser = useSelector((state) => get(state, 'userState.user'));
  const [user, setUser] = useState<any>(undefined);
  const [invitedMembers, setInvitedMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userProgressDrawer, setUserProgressDrawer] = useState({
    visible: false,
    data: null,
  });

  const getInvitedGroupMember = () => {
    setLoading(true);
    dispatch(fetchInvitedGroupMember(get(groupDetails, 'id')))
      .then((result: any) => {
        setInvitedMembers(result);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getInvitedGroupMember();
  }, []);

  const onAddMember = () => {
    if (!user) {
      notification.error({
        message: 'Email is required',
        description: 'Please input a user email!',
      });
      return;
    }
    let regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');

    if (!regex.test(user)) {
      notification.error({
        message: 'Invalid Email',
        description: 'Please input a valid format of email',
      });
      return;
    }

    if (find(get(groupDetails, 'group_members', []), ['email', user])) {
      notification.error({
        message: 'Already Shared',
        description: `Group is already shared with ${user}`,
      });
      return;
    }

    setLoading(true);
    dispatch(
      addMemberToGroup(get(groupDetails, 'id'), {
        email: user,
      })
    )
      .then(() => {
        setLoading(false);
        message.success(GROUP_MEMBER_UPDATED_SUCCESS);
        setUser(undefined);
        refreshGroupDetails();
        getInvitedGroupMember();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onRemoveMember = (index: Number) => {
    const membersId = map(get(groupDetails, 'group_members', []), 'id');
    setLoading(true);
    dispatch(
      removeMemberToGroup(get(groupDetails, 'id'), get(membersId, `${index}`))
    )
      .then(() => {
        setLoading(false);
        message.success(GROUP_MEMBER_REMOVED_SUCCESS);
        setUser(undefined);
        refreshGroupDetails();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onCancelInvitation = (uuid: any) => {
    setLoading(true);
    dispatch(cancelInvitation(uuid))
      .then(() => {
        setLoading(false);
        setUser(undefined);
        refreshGroupDetails();
        getInvitedGroupMember();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Modal
        centered
        visible={props.visible}
        maskClosable={false}
        footer={
          <>
            <Button type="primary" onClick={props.onCancel}>
              Cancel
            </Button>
          </>
        }
        onCancel={props.onCancel}
        destroyOnClose
        wrapClassName="group-members-style primary-modal-style"
        maskStyle={{ background: 'rgba(30,39,94, 0.8)' }}
        closable={false}
      >
        <Spin spinning={loading}>
          <div className="card-modal">
            <div className="modal-body-sec">
              <div className="header-section">
                <h3 className="title3">Group Members </h3>
              </div>

              <div className="flex-section">
                <div className="input-section">
                  <Input
                    value={user}
                    placeholder="share via entering email"
                    onChange={(e: any) => setUser(e.target.value)}
                  />
                </div>
                <Button
                  onClick={() => onAddMember()}
                  className="btn-add"
                  type="primary"
                >
                  Add
                </Button>
              </div>

              <div className="list-section">
                <Row>
                  <Col sm={16}>
                    <div className="list-head-text">Members</div>
                  </Col>
                  <Col sm={8}>
                    <div className="list-head-text">Role</div>
                  </Col>
                </Row>
                <List
                  className="demo-loadmore-list"
                  itemLayout="horizontal"
                  dataSource={[
                    ...get(groupDetails, 'group_members', []),
                    ...invitedMembers,
                  ]}
                  renderItem={(item: any, index: Number) => {
                    const action = !get(item, 'invited')
                      ? [
                          <Text code>
                            {get(adminUser, 'id') === get(item, 'id')
                              ? 'Admin'
                              : 'Member'}
                          </Text>,
                        ]
                      : [
                          <Popconfirm
                            title="Are you sure you want to cancel group invitation?"
                            onConfirm={() => {
                              onCancelInvitation(get(item, 'id'));
                            }}
                            onCancel={() => {}}
                            okText="Yes"
                            cancelText="No"
                          >
                            <Button type="link" icon={<DeleteOutlined />} />
                          </Popconfirm>,
                          get(item, 'invited') && (
                            <Tag color="red">Invited</Tag>
                          ),
                        ];
                    if (
                      !get(item, 'invited') &&
                      get(adminUser, 'id') !== get(item, 'id')
                    ) {
                      action.push(
                        <Popconfirm
                          title="Are you sure to remove this member from  group?"
                          onConfirm={() => {
                            onRemoveMember(index);
                          }}
                          onCancel={() => {}}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button type="link" icon={<DeleteOutlined />} />
                        </Popconfirm>
                      );
                      if (get(item, 'progress_access')) {
                        action.push(
                          <Button
                            className="progress-button"
                            size="small"
                            type="link"
                            onClick={() => {
                              setUserProgressDrawer({
                                visible: true,
                                data: item,
                              });
                            }}
                          >
                            Progress
                          </Button>
                        );
                      }
                    }
                    return (
                      <List.Item actions={action}>
                        <List.Item.Meta
                          avatar={
                            get(item, 'image') ? (
                              <Avatar src={get(item, 'image_url')} />
                            ) : (
                              <Avatar className="avatar-sec">
                                {upperCase(
                                  get(item, 'invited')
                                    ? get(item, 'email.0')
                                    : get(item, 'name.0')
                                )}
                              </Avatar>
                            )
                          }
                          title={get(item, 'name')}
                          description={get(item, 'email')}
                        />
                      </List.Item>
                    );
                  }}
                />
              </div>
            </div>
          </div>
        </Spin>
      </Modal>
      <Drawer
        width={'60%'}
        closable={false}
        destroyOnClose
        onClose={() => {
          setUserProgressDrawer({
            visible: false,
            data: null,
          });
        }}
        maskClosable={true}
        visible={get(userProgressDrawer, 'visible')}
      >
        <UserProgress user={get(userProgressDrawer, 'data')} />
      </Drawer>
    </>
  );
}

export default GroupMemberModal;
