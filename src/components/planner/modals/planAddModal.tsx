import {
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Row,
  Col,
  TimePicker,
  Spin,
  message,
} from "antd";
import moment from "moment";
import get from "lodash/get";
import { useDispatch } from "react-redux";
import {
  createUserCalendar,
  updateUserCalendar,
} from "../../../redux/actions/UserCalendarAction";
// Styles
import "./styles.scss";
import { useState } from "react";
import {
  CREATE_CALENDAR_PLAN_SUCCESS,
  UPDATE_CALENDAR_PLAN_SUCCESS,
} from "../../../constants/messages";
import ColorInput from "../../../components/colorInput";

const { RangePicker } = DatePicker;

function PlanAddModal(props: any) {
  const { edit, initialValues, onSuccess } = props;
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const generatePayload = (values: any) => {
    return {
      ...values,
      start_date: get(values, "date.0").format("YYYY-MM-DD"),
      end_date: get(values, "date.1").format("YYYY-MM-DD"),
      start_time: get(values, "start_time").format("HH:mm"),
      end_time: get(values, "end_time").format("HH:mm"),
    };
  };

  const addUserCalendar = (payload: any) => {
    setLoading(true);
    dispatch(createUserCalendar(payload))
      .then(() => {
        setLoading(false);
        message.success(CREATE_CALENDAR_PLAN_SUCCESS);
        onSuccess();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const editUserCalendar = (payload: any) => {
    setLoading(true);
    dispatch(updateUserCalendar(get(initialValues, "id"), payload))
      .then(() => {
        setLoading(false);
        message.success(UPDATE_CALENDAR_PLAN_SUCCESS);
        onSuccess();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onFinish = (values: any) => {
    const payload = generatePayload(values);
    if (edit) {
      editUserCalendar(payload);
    } else {
      addUserCalendar(payload);
    }
  };

  const onFinishFailed = (errorInfo: any) => {};

  return (
    <Modal
      centered
      visible={props.visible}
      footer={false}
      maskClosable={false}
      onCancel={props.onCancel}
      wrapClassName="planner-modal-style primary-modal-style"
      maskStyle={{ background: "rgba(30,39,94, 0.6)" }}
    >
      <Spin spinning={loading}>
        <div className="card-modal">
          <Form
            name="basic"
            layout="vertical"
            form={form}
            initialValues={
              edit
                ? {
                    ...initialValues,
                    date: [
                      moment(get(initialValues, "start_date"), "YYYY-MM-DD"),
                      moment(get(initialValues, "end_date"), "YYYY-MM-DD"),
                    ],
                    start_time: moment(
                      get(initialValues, "start_time"),
                      "HH:mm"
                    ),
                    end_time: moment(get(initialValues, "end_time"), "HH:mm"),
                  }
                : {
                    date: get(initialValues, "date")
                      ? [
                          moment(get(initialValues, "date"), "YYYY-MM-DD"),
                          moment(get(initialValues, "date"), "YYYY-MM-DD"),
                        ]
                      : [moment(), moment()],
                  }
            }
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div className="content-body">
              <div className="header">
                <h3 className="title3">{edit ? "Update" : "Create"} Plan</h3>
              </div>

              <div className="question-section">
                <Form.Item
                  name="title"
                  rules={[{ required: true, message: "Title is required!" }]}
                >
                  <Input placeholder="Title" />
                </Form.Item>

                <Form.Item
                  name="description"
                  rules={[
                    { required: true, message: "Description is required!" },
                  ]}
                >
                  <Input.TextArea
                    placeholder="Click to add Description"
                    rows={5}
                  />
                </Form.Item>

                <div className="folder-color-section">
                  <div className="text-label">Label color</div>
                  <ColorInput
                    form={form}
                    initialColor={
                      edit ? get(initialValues, "color") : "#6C5ECF"
                    }
                  />
                </div>

                <Form.Item
                  name="date"
                  label="From - To date"
                  rules={[{ required: true, message: "Date is required!" }]}
                >
                  <RangePicker className="date-planner" format={"DD-MM-YYYY"} />
                </Form.Item>

                <Row gutter={24}>
                  <Col sm={12}>
                    <Form.Item
                      name="start_time"
                      label="Start"
                      rules={[
                        { required: true, message: "Start time is required!" },
                      ]}
                    >
                      <TimePicker
                        format={"HH:mm"}
                        minuteStep={15}
                        className="timepicker"
                        defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
                      />
                    </Form.Item>
                  </Col>
                  <Col sm={12}>
                    <Form.Item
                      name="end_time"
                      dependencies={["start_time"]}
                      label="End"
                      rules={[
                        { required: true, message: "End time is required!" },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (
                              !value ||
                              getFieldValue("start_time").isBefore(value)
                            ) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error(
                                "End time should be greater than start time"
                              )
                            );
                          },
                        }),
                      ]}
                    >
                      <TimePicker
                        minuteStep={15}
                        format={"HH:mm"}
                        className="timepicker"
                        defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            </div>

            <div className="button-section">
              <Button className="btn-cancel" onClick={props.cancelHandler}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                {edit ? "Update" : "Add"}
              </Button>
            </div>
          </Form>
        </div>
      </Spin>
    </Modal>
  );
}

export default PlanAddModal;
