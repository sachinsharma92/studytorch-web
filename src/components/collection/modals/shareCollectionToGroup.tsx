import { Button, Modal, Input, Radio, Form, Spin, message, Select } from 'antd';
import get from 'lodash/get';
import map from 'lodash/map';
import filter from 'lodash/filter';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUserGroups } from '../../../redux/actions/groupActions';
import { shareCollectionToGroup } from '../../../redux/actions/collectionActions';
import { SHARE_COLLECTION__TO_GROUP_SUCCESS } from '../../../constants/messages';

// Styles
import './styles.scss';

const { Option } = Select;

function ShareCollectionGroup(props: any) {
  const { visible, collection, onCancel } = props;
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState<any[]>([]);
  const dispatch = useDispatch();

  const shareCollection = (groupUuid: any) => {
    setLoading(true);
    dispatch(shareCollectionToGroup(get(collection, 'id'), groupUuid))
      .then(() => {
        message.success(SHARE_COLLECTION__TO_GROUP_SUCCESS);
        onCancel();
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onFinish = (values: any) => {
    shareCollection(get(values, 'groupUuid'));
  };

  const onFinishFailed = (errorInfo: any) => {};

  const getgroups = () => {
    setLoading(true);
    dispatch(getUserGroups())
      .then((result: any) => {
        setGroups(filter(result, ['is_group_admin', true]));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getgroups();
  }, []);

  return (
    <Modal
      centered
      visible={visible}
      footer={false}
      onCancel={onCancel}
      destroyOnClose
      wrapClassName="collection-modal-style primary-modal-style"
      maskStyle={{ background: 'rgba(30,39,94, 0.8)' }}
    >
      <Spin spinning={loading}>
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <div className="card-modal">
            <h3 className="title3">
              Share Collection ({get(collection, 'name')}) to group
            </h3>

            <div className="input-section">
              <div className="label">Group </div>
              <Form.Item
                name="groupUuid"
                rules={[{ required: true, message: 'Please select a group!' }]}
              >
                <Select placeholder="Select collection" allowClear>
                  {map(groups, (group) => {
                    return (
                      <Option value={get(group, 'id')}>
                        {get(group, 'name')}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </div>

            <Button block type="primary" htmlType="submit">
              Share
            </Button>
          </div>
        </Form>
      </Spin>
    </Modal>
  );
}

export default ShareCollectionGroup;
