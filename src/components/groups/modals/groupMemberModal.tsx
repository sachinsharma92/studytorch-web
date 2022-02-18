import {
  Avatar,
  Button,
  List,
  Modal,
  Input,
  Select,
  Dropdown,
  Menu,
  Row,
  Col,
  Typography,
  Space,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import upperCase from 'lodash/upperCase';
import { getUserForGroup } from '../../../redux/actions/groupActions';

// Styles
import './styles.scss';
import { useState, useEffect, useCallback } from 'react';
import { map } from 'lodash';
const limit = 10;
const { Text } = Typography;

const menu = (
  <Menu>
    <Menu.Item>
      <a href="">Admin</a>
    </Menu.Item>
    <Menu.Item>
      <a href="">Member</a>
    </Menu.Item>
  </Menu>
);

const { Option } = Select;

function GroupMemberModal(props: any) {
  const { groupDetails } = props;
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => get(state, 'userState.user'));

  const getUsersForGroup = (id: any, query: any) => {
    setLoading(true);
    dispatch(getUserForGroup(id, query))
      .then((result: any) => {
        setUsers(result);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  console.log('@@@@@@users', users);
  useEffect(() => {
    getUsersForGroup(get(groupDetails, 'id'), { limit: 10 });
  }, []);

  const onSearch = (value: any) => {
    getUsersForGroup(get(groupDetails, 'id'), { limit: 10, query: value });
  };

  const debouncedChangeHandler = useCallback(debounce(onSearch, 500), []);

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
              <h3 className="title3">Group Members</h3>
            </div>

            <div className="flex-section">
              <div className="input-section">
                <Select
                  placeholder="E-mail/Username"
                  style={{ width: '100%' }}
                  loading={loading}
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
                        {get(user, 'name')}
                        {get(user, 'email')}
                      </Space>
                    </Option>
                  ))}
                </Select>
              </div>
              <Button
                onClick={props.addButtonHandler}
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
                renderItem={(item: any) => (
                  <List.Item
                    actions={[
                      <Text code>
                        {get(user, 'id') === get(item, 'id')
                          ? 'Admin'
                          : 'Member'}
                      </Text>,
                      <a className="list-close-button">x</a>,
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
