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
} from '../../../redux/actions/collectionActions';

// Images
import setting from '../../../assets/images/icons/setting.svg';
import arrowLeft from '../../../assets/images/icons/arrow-left.svg';

// Styles
import './styles.scss';

const { Option } = Select;
const { Text } = Typography;

function ShareCollectionModal(props: any) {
  const { collection } = props;
  console.log('@@@@@@collection', collection);
  const [isSettingModal, setIsSettingModal] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [sharedUsers, setSharedUsers] = useState([]);
  const [selectedUser, setSelecteduser] = useState(undefined);
  console.log({ sharedUsers });
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

  return (
    <>
      <Modal
        centered
        visible={props.visible}
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

              <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={sharedUsers}
                renderItem={(user, i) => (
                  <List.Item
                    actions={[
                      <Space direction="vertical">
                        <a className="list-edit-button">Editor</a>
                        <a className="list-edit-button">Editor</a>
                      </Space>,
                      <Button type="link" className="list-close-button">
                        x
                      </Button>,
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
              <Button block type="primary" onClick={props.doneHandler}>
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
              <Radio.Group onChange={() => {}} value={1} size={'large'}>
                <Radio value={1}>Yes</Radio>
                <Radio value={2}>No</Radio>
              </Radio.Group>
            </div>

            <div className="radio-section">
              <h4 className="title4">Action</h4>
              <Radio.Group onChange={() => {}} value={3} size={'large'}>
                <Radio value={3}>Can Edit</Radio>
                <Radio value={4}>Can View</Radio>
              </Radio.Group>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ShareCollectionModal;
