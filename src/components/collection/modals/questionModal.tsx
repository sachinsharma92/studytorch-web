import { useState } from "react";
import {
  Button,
  Modal,
  Spin,
  Divider,
  Tabs,
  Radio,
  Select,
  Checkbox,
  Row,
  Col,
  Input,
  Form,
  Space,
  message,
  notification,
} from "antd";
import { useDispatch } from "react-redux";
import get from "lodash/get";
import map from "lodash/map";
import last from "lodash/last";
import pullAt from "lodash/pullAt";

import indexOf from "lodash/indexOf";
import assign from "lodash/assign";
import includes from "lodash/includes";
import {
  createQuestion,
  updateQuestion,
} from "../../../redux/actions/questionActions";
import QuestionImageUpload from "../../../components/questionImageUpload";

import {
  CREATE_QUESTION_SUCCESS,
  UPDATE_QUESTION_SUCCESS,
} from "../../../constants/messages";

// Images
import iconArrowLeft from "../../../assets/images/icons/caret-Left.svg";
import ButtonCustom from "../../../common/buttons/buttonCustom";
import { optionAlphabet } from "../../../constants/questions";

// Styles
import "./styles.scss";

const { Option } = Select;

const { TabPane } = Tabs;

function QuestionModal(props: any) {
  const { onSuccess, edit, initialValue, collection } = props;
  const [loading, setLoading] = useState(false);

  const isMCQType =
    edit && get(initialValue, "type.value") !== 0 ? true : false;
  const [type, setType] = useState(edit ? get(initialValue, "type.value") : 0);
  const dispatch = useDispatch();
  const [activeTabKey, setActiveTabKey] = useState(isMCQType ? "2" : "1");

  const [images, setImages] = useState<any[]>(
    edit ? get(initialValue, "images", []) : []
  );

  const getOptionAnswerIndex = () => {
    const ans = get(initialValue, "answers", "");
    return map(ans, (a) => {
      return indexOf(get(initialValue, "options"), a);
    });
  };

  const [checkedOptions, setCheckedOptions] = useState<any[]>(
    isMCQType ? getOptionAnswerIndex() : []
  );
  const [optionCount, setOptionCount] = useState(
    isMCQType ? get(initialValue, "options", []).length : 2
  );

  const onChangeQuestionType = (key: any) => {
    if (key === "1") {
      setActiveTabKey(key);
      setType(0);
    } else {
      setType(1);
      setActiveTabKey(key);
    }
  };

  const generatePayload = (values: any) => {
    const returnObj = {};

    assign(returnObj, {
      parent_id: get(collection, "id"),
      note_id: get(values, "note_id"),
      title: get(values, "title"),
      type,
      images: map(images, "key"),
    });

    switch (type) {
      case 0:
        assign(returnObj, {
          answers: [get(values, "textanswer")],
        });
        break;

      case 1:
        assign(returnObj, {
          options: map(get(values, "answer"), "options"),
          answers: map(
            pullAt(get(values, "answer"), checkedOptions),
            "options"
          ),
        });
        break;

      case 2:
        assign(returnObj, {
          options: map(get(values, "answer"), "options"),
          answers: map(
            pullAt(get(values, "answer"), checkedOptions),
            "options"
          ),
        });
        break;
    }

    return returnObj;
  };

  const addQuestion = (payload: any) => {
    setLoading(true);
    dispatch(createQuestion(payload))
      .then(() => {
        setLoading(false);
        message.success(CREATE_QUESTION_SUCCESS);
        onSuccess(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const editQuestion = (payload: any) => {
    setLoading(true);
    dispatch(updateQuestion(get(initialValue, "id"), payload))
      .then(() => {
        setLoading(false);
        message.success(UPDATE_QUESTION_SUCCESS);
        onSuccess(true);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onFinish = (values: number[]) => {
    const payload = generatePayload(values);
    if (type !== 0 && checkedOptions.length === 0) {
      notification.error({
        message: "Please mark atlast one option as correct one",
      });
      return;
    }

    if (edit) {
      editQuestion(payload);
    } else {
      addQuestion(payload);
    }
  };

  const onFinishFailed = () => {};

  const onCheckedOption = (values: any) => {
    setCheckedOptions(values);
    if (values.length === 0) {
      setCheckedOptions([]);
      return;
    }
    if (type === 1) {
      const checkedValue: any = last<number>(values);
      setCheckedOptions([checkedValue]);
    } else {
      setCheckedOptions(values);
    }
  };

  const getInitialValues = () => {
    const returnObj = {
      title: get(initialValue, "title"),
      note_id: get(initialValue, "note.id"),
    };
    const ans = get(initialValue, "answers", "");
    if (!isMCQType) {
      assign(returnObj, {
        textanswer: get(ans, "0"),
      });
    } else {
      assign(returnObj, {
        answer: map(get(initialValue, "options"), (option) => {
          return {
            options: option,
            correct: includes(ans, option),
          };
        }),
      });
    }

    return returnObj;
  };

  return (
    <Modal
      centered
      visible={props.visible}
      destroyOnClose
      footer={false}
      focusTriggerAfterClose
      onCancel={props.onCancel}
      wrapClassName="question-modal-style primary-modal-style"
      maskStyle={{ background: "rgba(30,38,94, 0.6)" }}
    >
      <Spin spinning={loading}>
        <div className="card-modal">
          <div className="top-button-section">
            <Button onClick={props.cancelHandler} className="btn-outline">
              <img src={iconArrowLeft} alt="" /> Back
            </Button>
          </div>

          <h3 className="title3">{edit ? "Edit" : "Add"} Question</h3>
          <Form
            name="basic"
            initialValues={edit ? getInitialValues() : {}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <div className="main-content-section">
              <Row>
                <Col xl={24}>
                  <Form.Item
                    name="title"
                    rules={[
                      {
                        required: true,
                        message: "Please input question !",
                      },
                    ]}
                  >
                    <Input
                      className="input-lg-style"
                      placeholder="Question Title..."
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Divider />
              <Row>
                <Col xl={12}>
                  <Form.Item
                    name="note_id"
                    label="Note"
                    rules={[
                      {
                        required: true,
                        message: "Please select note !",
                      },
                    ]}
                  >
                    <Select size="large" placeholder="Select Note">
                      {map(get(collection, "notes"), (note, i) => {
                        return (
                          <Option key={i} value={get(note, "id")}>
                            {get(note, "title")}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xl={12}>
                  <Tabs
                    activeKey={activeTabKey}
                    className="tab-button-style"
                    onChange={onChangeQuestionType}
                    destroyInactiveTabPane
                  >
                    <TabPane tab="Text" key="1" disabled={edit && isMCQType}>
                      <h4 className="title4 fade-style">
                        <Form.Item
                          name="textanswer"
                          rules={[
                            {
                              required: true,
                              message: "Please input answer !",
                            },
                          ]}
                        >
                          <Input.TextArea
                            rows={6}
                            className="input-lg-style"
                            placeholder="You answer should come here...."
                          />
                        </Form.Item>
                      </h4>
                    </TabPane>

                    <TabPane tab="MCQs" key="2" disabled={edit && !isMCQType}>
                      <div className="select-radio-section">
                        <Radio.Group
                          disabled={edit}
                          onChange={(e) => {
                            setType(e.target.value);
                            setCheckedOptions([]);
                          }}
                          value={type}
                        >
                          <Radio value={1}>Single answer</Radio>
                          <Radio value={2}>Multiple answer</Radio>
                        </Radio.Group>
                      </div>

                      <div className="select-value">
                        <Select
                          placeholder="No. of options"
                          value={optionCount}
                          onChange={(value) => setOptionCount(value)}
                        >
                          <Option value={2}>2</Option>
                          <Option value={3}>3</Option>
                          <Option value={4}>4</Option>
                          <Option value={5}>5</Option>
                          <Option value={6}>6</Option>
                          <Option value={7}>7</Option>
                          <Option value={8}>8</Option>
                        </Select>
                      </div>

                      <div className="question-list">
                        <Row>
                          <Checkbox.Group
                            style={{ width: "100%" }}
                            value={checkedOptions}
                            onChange={(obj: any) => {
                              onCheckedOption(obj);
                            }}
                          >
                            {map(Array(optionCount), (t, i) => {
                              return (
                                <Col span={24}>
                                  <Space>
                                    <Form.Item
                                      name={["answer", i, "correct"]}
                                      valuePropName="checked"
                                    >
                                      <Checkbox value={i}>
                                        {optionAlphabet[i]}{" "}
                                      </Checkbox>
                                    </Form.Item>
                                    <Form.Item
                                      name={["answer", i, "options"]}
                                      rules={[
                                        {
                                          required: true,
                                          message: "Please input option !",
                                        },
                                      ]}
                                    >
                                      <Input placeholder="Option 1" />
                                    </Form.Item>
                                  </Space>
                                  {/* <span className="text-span">Option 1</span> */}
                                </Col>
                              );
                            })}
                          </Checkbox.Group>
                        </Row>
                      </div>
                    </TabPane>
                  </Tabs>
                </Col>
                <Col xl={2} />
                <Col xl={10}>
                  <Form.Item label="Images">
                    <QuestionImageUpload
                      setLoading={setLoading}
                      images={images}
                      edit={edit}
                      setImages={setImages}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>

            <div className="button-bottom-section">
              <ButtonCustom
                onClick={props.cancelHandler}
                className="round-sm-primary"
                title="Cancel"
              />
              <div className={`button-custom`}>
                <Button type="primary" htmlType="submit">
                  {edit ? "Update" : "Submit"}
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </Spin>
    </Modal>
  );
}

export default QuestionModal;
