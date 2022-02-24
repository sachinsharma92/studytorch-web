import {
  Avatar,
  Button,
  List,
  Modal,
  Space,
  Select,
  Radio,
  Spin,
  Typography,
  Input,
  message,
  Popconfirm,
} from 'antd';
import { useState, useEffect, useCallback } from 'react';
import get from 'lodash/get';
import map from 'lodash/map';
import debounce from 'lodash/debounce';
import { useDispatch } from 'react-redux';
import { getNameAvatar } from '../../../utilities/helpers';
import { avatarColors } from '../../../constants/groups';
import {
  fetchUserForCollection,
  fetchCollectionSharedUsers,
  shareCollection,
  removeFromShareCollection,
} from '../../../redux/actions/collectionActions';
import {
  SHARE_COLLECTION_SUCCESS,
  REMOVE_SHARE_COLLECTION_SUCCESS,
} from '../../../constants/messages';
// Images
import setting from '../../../assets/images/icons/setting.svg';
import arrowLeft from '../../../assets/images/icons/arrow-left.svg';

// Styles
import './styles.scss';

const { Option } = Select;
const { Text } = Typography;

function ShareCollectionModal(props: any) {
  const { collection } = props;

  const [isSettingModal, setIsSettingModal] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [sharedUsers, setSharedUsers] = useState([]);
  const [selectedUser, setSelecteduser] = useState({
    user: undefined,
    edit_persmission: 0,
    subfolder_shared: 0,
  });

  const settingModalToggle = () => {
    setIsSettingModal(!isSettingModal);
  };

  const getUsersForCollection = (id: any, query: any) => {
    setLoading(true);
    dispatch(fetchUserForCollection(id, query))
      .then((result: []) => {
        setUsers([...result]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const getSharedUser = (id: any) => {
    setLoading(true);
    dispatch(fetchCollectionSharedUsers(id))
      .then((result: []) => {
        setSharedUsers([...result]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getUsersForCollection(get(collection, 'id'), { limit: 10 });
    getSharedUser(get(collection, 'id'));
  }, []);

  const onSearch = (value: any) => {
    getUsersForCollection(get(collection, 'id'), { limit: 10, query: value });
  };

  const debouncedChangeHandler = useCallback(debounce(onSearch, 500), []);

  const onAddUser = () => {
    const payload = {
      parent_id: get(collection, 'id'),
      edit_persmission: get(selectedUser, 'edit_persmission'),
      subfolder_shared: get(selectedUser, 'subfolder_shared'),
      user_uuid: [get(selectedUser, 'user')],
    };

    setLoading(true);
    dispatch(shareCollection(payload))
      .then((result: []) => {
        getUsersForCollection(get(collection, 'id'), { limit: 10 });
        getSharedUser(get(collection, 'id'));
        message.success(SHARE_COLLECTION_SUCCESS);
        setSelecteduser({
          user: undefined,
          edit_persmission: 0,
          subfolder_shared: 0,
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onRemoveUser = (user_id: any) => {
    setLoading(true);
    dispatch(removeFromShareCollection(get(collection, 'id'), user_id))
      .then(() => {
        getUsersForCollection(get(collection, 'id'), { limit: 10 });
        getSharedUser(get(collection, 'id'));
        message.success(REMOVE_SHARE_COLLECTION_SUCCESS);
        setLoading(false);
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
        destroyOnClose
        footer={false}
        onCancel={props.onCancel}
        wrapClassName="share-modal-style primary-modal-style"
        maskStyle={{ background: 'rgba(30,39,94, 0.8)' }}
        closable={false}
      >
        <Spin spinning={loading}>
          <div className="card-modal">
            <div className="modal-body-sec">
              <div className="header-section">
                <h3 className="title3">Share collection</h3>
                <button className="setting-button" onClick={settingModalToggle}>
                  <img src={setting} alt="" />
                </button>
              </div>
              <div className="input-section">
                <Input.Group>
                  <Select
                    placeholder="E-mail/Username"
                    style={{ width: '100%' }}
                    loading={loading}
                    value={get(selectedUser, 'user')}
                    onChange={(value: any) =>
                      setSelecteduser({ ...selectedUser, user: value })
                    }
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
                  <Select
                    value={get(selectedUser, 'edit_persmission')}
                    onChange={(value) => {
                      setSelecteduser({
                        ...selectedUser,
                        edit_persmission: value,
                      });
                    }}
                  >
                    <Option value={0}>Can View</Option>
                    <Option value={1}>Can Edit</Option>
                  </Select>
                </Input.Group>
              </div>

              <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={sharedUsers}
                renderItem={(user, i) => (
                  <List.Item
                    actions={[
                      <Space direction="vertical">
                        <Button type="link" className="list-edit-button">
                          {get(user, 'share_collection.edit_persmission')
                            ? 'Editor'
                            : 'Viewer'}
                        </Button>
                      </Space>,
                      <Popconfirm
                        title="Are you sure to remove this member from  Collection?"
                        onConfirm={() => {
                          onRemoveUser(get(user, 'id'));
                        }}
                        onCancel={() => {}}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button type="link" className="list-close-button">
                          x
                        </Button>
                      </Popconfirm>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={
                        get(user, 'image') ? (
                          <Avatar src={get(user, 'image_url')} />
                        ) : (
                          getNameAvatar(
                            get(user, 'name'),
                            30,
                            avatarColors[i % 4]
                          )
                        )
                      }
                      title={
                        <a href="https://ant.design">{get(user, 'username')}</a>
                      }
                      description={get(user, 'email')}
                    />
                  </List.Item>
                )}
              />
            </div>

            <div className="modal-footer-style">
              <Button block type="link" onClick={props.cancelHandler}>
                Cancel
              </Button>
              <Button block type="primary" onClick={onAddUser}>
                Done
              </Button>
            </div>
          </div>
        </Spin>
      </Modal>

      <Modal
        centered
        visible={isSettingModal}
        footer={false}
        onCancel={settingModalToggle}
        wrapClassName="share-modal-style share-setting"
        maskStyle={{ background: '#4A527E' }}
        closable={false}
      >
        <div className="card-modal">
          <div className="modal-body-sec">
            <div className="header-section">
              <h3 className="title3">Share Settings</h3>
              <button className="setting-button" onClick={settingModalToggle}>
                <img src={arrowLeft} alt="" />
              </button>
            </div>

            <div className="radio-section">
              <h4 className="title4">Share Sub-folders</h4>
              <Radio.Group
                onChange={(e) => {
                  setSelecteduser({
                    ...selectedUser,
                    subfolder_shared: get(e, 'target.value'),
                  });
                }}
                value={get(selectedUser, 'subfolder_shared')}
                size={'large'}
              >
                <Radio value={1}>Yes</Radio>
                <Radio value={0}>No</Radio>
              </Radio.Group>
            </div>

            <div className="radio-section">
              <h4 className="title4">Action</h4>
              <Radio.Group
                onChange={(e) => {
                  setSelecteduser({
                    ...selectedUser,
                    edit_persmission: get(e, 'target.value'),
                  });
                }}
                value={get(selectedUser, 'edit_persmission')}
                size={'large'}
              >
                <Radio value={1}>Can Edit</Radio>
                <Radio value={0}>Can View</Radio>
              </Radio.Group>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ShareCollectionModal;
