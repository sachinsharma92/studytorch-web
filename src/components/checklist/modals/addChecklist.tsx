import { Button, Modal, Form, Input, Spin, message } from "antd";
import { useDispatch } from "react-redux";
import get from "lodash/get";

import {
  createChecklist,
  updateChecklist,
} from "../../../redux/actions/checklistActions";
import {
  CREATE_CHECKLIST_SUCCESS,
  UPDATE_CHECKLIST_SUCCESS,
} from "../../../constants/messages";

// Styles
import "./styles.scss";
import { useState } from "react";

function AddChecklist(props: any) {
  const { edit, initialValues, onSuccess } = props;

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const addChecklist = (payload: any) => {
    setLoading(true);
    dispatch(createChecklist(payload))
      .then(() => {
        setLoading(false);
        message.success(CREATE_CHECKLIST_SUCCESS);
        onSuccess();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const editChecklist = (payload: any) => {
    setLoading(true);
    dispatch(updateChecklist(get(initialValues, "id"), payload))
      .then(() => {
        setLoading(false);
        message.success(UPDATE_CHECKLIST_SUCCESS);
        onSuccess();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onFinish = (values: any) => {
    if (edit) {
      editChecklist(values);
    } else {
      addChecklist(values);
    }
  };

  const onFinishFailed = (errorInfo: any) => {};

  return (
    <Modal
      centered
      visible={props.visible}
      footer={false}
      onCancel={props.onCancel}
      wrapClassName="planner-modal-style primary-modal-style"
      maskStyle={{ background: "rgba(30,39,94, 0.6)" }}
    >
      <Spin spinning={loading}>
        <div className="card-modal">
          <Form
            name="basic"
            layout="vertical"
            initialValues={edit ? initialValues : {}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div className="content-body">
              <div className="header">
                <h3 className="title3">
                  {edit ? "Edit" : "Create"} Study Checklist
                </h3>
              </div>

              <div className="question-section">
                <Form.Item
                  label="Enter name"
                  name="title"
                  rules={[
                    { required: true, message: "Name field is required!" },
                  ]}
                >
                  <Input placeholder="List name" />
                </Form.Item>
              </div>
            </div>

            <div className="button-section">
              <Button block type="primary" htmlType="submit">
                Save
              </Button>
            </div>
          </Form>
        </div>
      </Spin>
    </Modal>
  );
}

export default AddChecklist;
