import { Button, Modal, Input, Radio, message, Spin, Form } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import get from 'lodash/get';
import map from 'lodash/map';
import './styles.scss';
import {
  CREATE_GROUP_SUCCESS,
  UPDATE_GROUP_SUCCESS,
} from '../../../constants/messages';
import { createGroup, updateGroup } from '../../../redux/actions/groupActions';

const colors = ['#FFEDE3', '#E3F8FF', '#FFE3E1', '#EFF2FF'];

// Styles

function GroupCreateModal(props: any) {
  const dispatch = useDispatch();
  const { onSuccess, initialValue, edit } = props;
  const [loading, setLoading] = useState(false);

  const addGroup = (payload: any) => {
    setLoading(true);
    dispatch(createGroup(payload))
      .then(() => {
        onSuccess();
        message.success(CREATE_GROUP_SUCCESS);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const editGroup = (payload: any) => {
    setLoading(true);
    dispatch(updateGroup(get(initialValue, 'id'), payload))
      .then(() => {
        onSuccess();
        message.success(UPDATE_GROUP_SUCCESS);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onFinish = (values: any) => {
    if (edit) {
      editGroup({ ...values });
    } else {
      addGroup({ ...values });
    }
  };

  const onFinishFailed = (errorInfo: any) => {};

  return (
    <Modal
      centered
      visible={props.visible}
      destroyOnClose
      footer={false}
      onCancel={props.onCancel}
      wrapClassName="group-modal-style primary-modal-style"
      maskStyle={{ background: 'rgba(30,39,94, 0.6)' }}
    >
      <Spin spinning={loading}>
        <Form
          name="basic"
          initialValues={
            edit
              ? initialValue
              : {
                  color: colors[0],
                }
          }
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <div className="card-modal">
            <h3 className="title3">Create a Group</h3>

            <div className="input-section">
              <div className="label">Group Name</div>
              <Form.Item
                name="name"
                rules={[
                  { required: true, message: 'Please input Group name!' },
                ]}
              >
                <Input placeholder="Maths Group" />
              </Form.Item>
            </div>

            <div className="folder-color-section radio-tick-container">
              <div className="label">Select Color</div>
              <Form.Item
                name="color"
                rules={[{ required: true, message: 'Please select colour!' }]}
              >
                <Radio.Group>
                  {map(colors, (c, index) => (
                    <Radio.Button
                      key={index}
                      value={c}
                      className={`radio-tick-style`}
                      style={{ background: c }}
                    />
                  ))}
                </Radio.Group>
              </Form.Item>
            </div>
            <Button block type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </Form>
      </Spin>
    </Modal>
  );
}

export default GroupCreateModal;
