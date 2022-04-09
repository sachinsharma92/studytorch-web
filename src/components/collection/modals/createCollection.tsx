import { Button, Modal, Input, Form, Spin, message } from "antd";
import get from "lodash/get";

import { useState } from "react";
import { useDispatch } from "react-redux";
import ColorInput from "../../../components/colorInput";
import {
  createCollection,
  updateCollection,
} from "../../../redux/actions/collectionActions";
import {
  CREATE_COLLECTION_SUCCESS,
  UPDATE_COLLECTION_SUCCESS,
} from "../../../constants/messages";

// Styles
import "./styles.scss";

function CreateCollectionModal(props: any) {
  const { edit, onSuccess, collection, initialValue } = props;
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
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
    dispatch(updateCollection(get(initialValue, "id"), payload))
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
      editCollection({ ...values, parent_id: get(collection, "id") });
    } else {
      addCollection({ ...values, parent_id: get(collection, "id") });
    }
  };

  const onFinishFailed = (errorInfo: any) => {};

  return (
    <Modal
      centered
      visible={get(props, "visible")}
      footer={false}
      onCancel={get(props, "onCancel")}
      destroyOnClose
      wrapClassName="collection-modal-style primary-modal-style"
      maskStyle={{ background: "rgba(30,39,94, 0.8)" }}
    >
      <Spin spinning={loading}>
        <Form
          form={form}
          name="basic"
          initialValues={edit ? initialValue : {}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <div className="card-modal">
            <h3 className="title3">
              {edit ? "Edit Collection" : "Create Collection"}
            </h3>

            <div className="input-section">
              <div className="label">Collection name</div>
              <Form.Item
                name="name"
                rules={[
                  { required: true, message: "Please input collection name!" },
                ]}
              >
                <Input placeholder="Ex. Maths" />
              </Form.Item>
            </div>

            <div className="folder-color-section radio-tick-container">
              <div className="label">Select Color</div>
              <ColorInput
                form={form}
                edit={edit}
                initialColor={edit ? get(initialValue, "color") : "#6C5ECF"}
              />
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
