import { Button, Modal, Form, Input, Spin, message } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { changePassword } from "../../../redux/actions/userActions";
import { CHANGE_PASSWORD_SUCCESS } from "../../../constants/messages";

// Styles
import "./styles.scss";

function ChangePassword(props: any) {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const onFinish = (values: any) => {
    setLoading(true);
    dispatch(changePassword(values))
      .then(() => {
        setLoading(false);
        message.success(CHANGE_PASSWORD_SUCCESS);
        props.cancelHandler();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onFinishFailed = (errorInfo: any) => {};

  return (
    <Modal
      centered
      visible={props.visible}
      footer={false}
      destroyOnClose
      onCancel={props.onCancel}
      wrapClassName="planner-modal-style primary-modal-style"
      maskStyle={{ background: "rgba(30,39,94, 0.6)" }}
    >
      <Spin spinning={loading}>
        <div className="card-modal">
          <Form
            name="basic"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div className="content-body">
              <div className="header">
                <h3 className="title3">Change Password</h3>
              </div>

              <div className="question-section">
                <Form.Item
                  label="Current Password"
                  name="current_password"
                  rules={[
                    { required: true, message: "Current password is required" },
                  ]}
                >
                  <Input placeholder="Enter Password" />
                </Form.Item>
                <Form.Item
                  label="New Password"
                  name="new_password"
                  rules={[
                    { required: true, message: "New password is required" },
                  ]}
                >
                  <Input placeholder="Enter Password" />
                </Form.Item>
                <Form.Item
                  label="Confim New Password"
                  name="confirm_password"
                  dependencies={["new_password"]}
                  rules={[
                    { required: true, message: "Confirm password is required" },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("new_password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The two passwords that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input placeholder="Enter Password" />
                </Form.Item>
              </div>
            </div>

            <div className="button-bottom-section">
              <Button className="btn-cancel" onClick={props.cancelHandler}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Done
              </Button>
            </div>
          </Form>
        </div>
      </Spin>
    </Modal>
  );
}

export default ChangePassword;
