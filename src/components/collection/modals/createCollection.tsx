import { Button, Modal, Input, Radio, Form, Spin, message } from 'antd';
import get from 'lodash/get';
import map from 'lodash/map';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { collectionColors } from '../../../constants/collections';
import {
  createCollection,
  updateCollection,
} from '../../../redux/actions/collectionActions';
import {
  CREATE_COLLECTION_SUCCESS,
  UPDATE_COLLECTION_SUCCESS,
} from '../../../constants/messages';

// Styles
import './styles.scss';

function CreateCollectionModal(props: any) {
  const { edit, onSuccess, collection, initialValue } = props;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const addCollection = (payload: any) => {
    setLoading(true);
    dispatch(createCollection(payload))
      .then(() => {
        onSuccess();
        message.success(CREATE_COLLECTION_SUCCESS);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const editCollection = (payload: any) => {
    setLoading(true);
    dispatch(updateCollection(get(initialValue, 'id'), payload))
      .then(() => {
        onSuccess();
        message.success(UPDATE_COLLECTION_SUCCESS);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onFinish = (values: any) => {
    if (edit) {
      editCollection({ ...values, parent_id: get(collection, 'id') });
    } else {
      addCollection({ ...values, parent_id: get(collection, 'id') });
    }
  };

  const onFinishFailed = (errorInfo: any) => {};

  return (
    <Modal
      centered
      visible={get(props, 'visible')}
      footer={false}
      onCancel={get(props, 'onCancel')}
      destroyOnClose
      wrapClassName="collection-modal-style primary-modal-style"
      maskStyle={{ background: '#787D9F' }}
    >
      <Spin spinning={loading}>
        <Form
          name="basic"
          initialValues={
            edit
              ? initialValue
              : {
                  color: 'purple',
                }
          }
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <div className="card-modal">
            <h3 className="title3">
              {edit ? 'Update Collection' : 'Create Collection'}
            </h3>

            <div className="input-section">
              <div className="label">Collection name</div>
              <Form.Item
                name="name"
                rules={[
                  { required: true, message: 'Please input collection name!' },
                ]}
              >
                <Input placeholder="Ex. Maths" />
              </Form.Item>
            </div>

            <div className="folder-color-section">
              <div className="label">Select Color</div>
              <Form.Item
                name="color"
                rules={[{ required: true, message: 'Please select colour!' }]}
              >
                <Radio.Group>
                  {map(collectionColors, (collectionColor) => {
                    return (
                      <Radio.Button
                        value={get(collectionColor, 'value')}
                        className={`radio-button`}
                        style={{ background: get(collectionColor, 'value') }}
                      />
                    );
                  })}
                </Radio.Group>
              </Form.Item>
            </div>
            <Button block type="primary" htmlType="submit">
              Created
            </Button>
          </div>
        </Form>
      </Spin>
    </Modal>
  );
}

export default CreateCollectionModal;
