import {
  Avatar,
  Button,
  List,
  Modal,
  Space,
  Select,
  Radio,
  Spin,
  notification,
  Input,
  message,
  Popconfirm,
  Tag,
} from 'antd';
import { useState, useEffect } from 'react';
import get from 'lodash/get';
import find from 'lodash/find';
import { useDispatch } from 'react-redux';
import { getNameAvatar } from '../../../utilities/helpers';
import { avatarColors } from '../../../constants/groups';
import { cancelInvitation } from '../../../redux/actions/userActions';
import {
  fetchCollectionSharedUsers,
  shareCollection,
  removeFromShareCollection,
  fetchInvitedCollectionMember,
} from '../../../redux/actions/collectionActions';
import {
  SHARE_COLLECTION_SUCCESS,
  REMOVE_SHARE_COLLECTION_SUCCESS,
} from '../../../constants/messages';
// Images
import setting from '../../../assets/images/icons/setting.svg';
import arrowLeft from '../../../assets/images/icons/arrow-left.svg';
import { DeleteOutlined } from '@ant-design/icons';

// Styles
import './styles.scss';

const { Option } = Select;

function ShareCollectionModal(props: any) {
  const { collection } = props;

  const [isSettingModal, setIsSettingModal] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [sharedUsers, setSharedUsers] = useState([]);
  const [invitedUsers, setInvitedUsers] = useState([]);
  const [selectedUser, setSelecteduser] = useState({
    user: undefined,
    edit_persmission: 0,
    subfolder_shared: 0,
  });

  const settingModalToggle = () => {
    setIsSettingModal(!isSettingModal);
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

  const getInvitedMembers = (id: any) => {
    setLoading(true);
    dispatch(fetchInvitedCollectionMember(id))
      .then((result: []) => {
        setInvitedUsers([...result]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getSharedUser(get(collection, 'id'));
    getInvitedMembers(get(collection, 'id'));
  }, []);

  const onAddUser = () => {
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

    if (find(sharedUsers, ['email', user])) {
      notification.error({
        message: 'Already Shared',
        description: `Collection is already shared with ${user}`,
      });
      return;
    }

    const payload = {
      parent_id: get(collection, 'id'),
      edit_persmission: get(selectedUser, 'edit_persmission'),
      subfolder_shared: get(selectedUser, 'subfolder_shared'),
      email: user,
    };

    setLoading(true);
    dispatch(shareCollection(payload))
      .then((result: []) => {
        getSharedUser(get(collection, 'id'));
        getInvitedMembers(get(collection, 'id'));
        message.success(SHARE_COLLECTION_SUCCESS);
        setSelecteduser({
          user: undefined,
          edit_persmission: 0,
          subfolder_shared: 0,
        });
        setUser(null);
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
        getSharedUser(get(collection, 'id'));
        getInvitedMembers(get(collection, 'id'));
        message.success(REMOVE_SHARE_COLLECTION_SUCCESS);
        setLoading(false);
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
        getSharedUser(get(collection, 'id'));
        getInvitedMembers(get(collection, 'id'));
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
                  <Input
                    value={user}
                    placeholder="share via entering email"
                    onChange={(e: any) => setUser(e.target.value)}
                  />
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
                dataSource={[...sharedUsers, ...invitedUsers]}
                renderItem={(user, i) => (
                  <List.Item
                    actions={
                      !get(user, 'invited')
                        ? [
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
                              <Button type="link" icon={<DeleteOutlined />} />
                            </Popconfirm>,
                          ]
                        : [
                            <Popconfirm
                              title="Are you sure you want to cancel share collection invitation?"
                              onConfirm={() => {
                                onCancelInvitation(get(user, 'id'));
                              }}
                              onCancel={() => {}}
                              okText="Yes"
                              cancelText="No"
                            >
                              <Button type="link" icon={<DeleteOutlined />} />
                            </Popconfirm>,
                            <Tag color="red">Invited</Tag>,
                          ]
                    }
                  >
                    <List.Item.Meta
                      avatar={
                        get(user, 'image') ? (
                          <Avatar src={get(user, 'image_url')} />
                        ) : (
                          getNameAvatar(
                            !get(user, 'invited')
                              ? get(user, 'name')
                              : get(user, 'email'),
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
