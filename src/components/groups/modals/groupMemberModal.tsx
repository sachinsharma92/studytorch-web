import {
  Avatar,
  Button,
  List,
  Modal,
  message,
  Select,
  Popconfirm,
  Row,
  Col,
  Typography,
  Space,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import upperCase from 'lodash/upperCase';
import {
  getUserForGroup,
  addMemberToGroup,
} from '../../../redux/actions/groupActions';
import { getNameAvatar } from '../../../utilities/helpers';
import { avatarColors } from '../../../constants/groups';
import { GROUP_MEMBER_UPDATED_SUCCESS } from '../../../constants/messages';

// Styles
import './styles.scss';
import { useState, useEffect, useCallback } from 'react';
import { map, remove } from 'lodash';

const { Text } = Typography;

const { Option } = Select;

function GroupMemberModal(props: any) {
  const { groupDetails, refreshGroupDetails } = props;
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelecteduser] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => get(state, 'userState.user'));

  const getUsersForGroup = (id: any, query: any) => {
    setLoading(true);
    dispatch(getUserForGroup(id, query))
      .then((result: []) => {
        setUsers([...result]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getUsersForGroup(get(groupDetails, 'id'), { limit: 10 });
  }, []);

  const onSearch = (value: any) => {
    getUsersForGroup(get(groupDetails, 'id'), { limit: 10, query: value });
  };

  const onAddMember = (userIdArr: any = []) => {
    setLoading(true);
    dispatch(
      addMemberToGroup(get(groupDetails, 'id'), {
        user_uuid: userIdArr,
      })
    )
      .then(() => {
        setLoading(false);
        message.success(GROUP_MEMBER_UPDATED_SUCCESS);
        setSelecteduser(undefined);
        refreshGroupDetails();
        getUsersForGroup(get(groupDetails, 'id'), { limit: 10 });
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const debouncedChangeHandler = useCallback(debounce(onSearch, 500), []);

  const onRemoveMember = (index: Number) => {
    const membersId = map(get(groupDetails, 'group_members', []), 'id');
    remove(membersId, (id, i) => i === index);
    onAddMember(membersId);
  };

  return (
    <>
      <Modal
        centered
        visible={props.visible}
        footer={false}
        onCancel={props.onCancel}
        destroyOnClose
        wrapClassName="group-members-style primary-modal-style"
        maskStyle={{ background: 'rgba(30,39,94, 0.8)' }}
        closable={false}
      >
        <div className="card-modal">
          <div className="modal-body-sec">
            <div className="header-section">
              <h3 className="title3">Group Members {users.length}</h3>
            </div>

            <div className="flex-section">
              <div className="input-section">
                <Select
                  placeholder="E-mail/Username"
                  style={{ width: '100%' }}
                  loading={loading}
                  value={selectedUser}
                  onChange={(value: any) => setSelecteduser(value)}
                  showSearch
                  onSearch={debouncedChangeHandler}
                >
                  {map(users, (user, i) => (
                    <Option
                      key={i}
                      value={get(user, 'id')}
                      label={get(user, 'name')}
                    >
                      <Space>
                        {get(user, 'image') ? (
                          <Avatar src={get(user, 'image_url')} />
                        ) : (
                          getNameAvatar(
                            get(user, 'name'),
                            30,
                            avatarColors[i % 4]
                          )
                        )}
                        <Space>
                          <Text>{get(user, 'username')}</Text>
                          <Text code>{get(user, 'email')}</Text>
                        </Space>
                        {/* {get(user, 'email')} */}
                      </Space>
                    </Option>
                  ))}
                </Select>
              </div>
              <Button
                onClick={() =>
                  onAddMember([
                    selectedUser,
                    ...map(get(groupDetails, 'group_members', []), 'id'),
                  ])
                }
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
                dataSource={get(groupDetails, 'group_members', [])}
                renderItem={(item: any, index: Number) => (
                  <List.Item
                    actions={[
                      <Text code>
                        {get(user, 'id') === get(item, 'id')
                          ? 'Admin'
                          : 'Member'}
                      </Text>,
                      // <a className="list-close-button">x</a>,
                      get(user, 'id') !== get(item, 'id') && (
                        <Popconfirm
                          title="Are you sure to remove this member from  group?"
                          onConfirm={() => {
                            onRemoveMember(index);
                          }}
                          onCancel={() => {}}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button type="link" className="list-close-button">
                            x
                          </Button>
                        </Popconfirm>
                      ),
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        get(item, 'image') ? (
                          <Avatar src={get(item, 'image_url')} />
                        ) : (
                          <Avatar className="avatar-sec">
                            {upperCase(get(item, 'name.0'))}
                          </Avatar>
                        )
                      }
                      title={get(item, 'name')}
                      description={get(item, 'email')}
                    />
                  </List.Item>
                )}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default GroupMemberModal;
