import { useState } from "react";
import get from "lodash/get";
import map from "lodash/map";
import isUndefined from "lodash/isUndefined";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import assign from "lodash/assign";
import {
  Button,
  Modal,
  Breadcrumb,
  Form,
  Row,
  Col,
  message,
  Card,
  Spin,
  Input,
  Tooltip,
} from "antd";
import ButtonCustom from "../../../common/buttons/buttonCustom";
import { createBulkNote } from "../../../redux/actions/noteActions";
import SingleImageUpload from "../../../common/singleImageUpload";
// Images
import iconArrowLeft from "../../../assets/images/icons/caret-Left.svg";
import { CREATE_NOTE_SUCCESS } from "../../../constants/messages";
import { noteEditorObj } from "../../../constants/notes";
// Styles
import "./styles.scss";

function CreateMultipleNoteModal(props: any) {
  const { collection, onSuccess, onCancel, visible } = props;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const addNotes = (payload: any) => {
    setLoading(true);
    dispatch(createBulkNote(payload))
      .then(() => {
        onSuccess();
        message.success(CREATE_NOTE_SUCCESS);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onFinish = (values: any) => {
    const paylaod = map(get(values, "notes"), (note: any) => {
      const description = JSON.parse(JSON.stringify(noteEditorObj));
      description["blocks"][0]["text"] = get(note, "description");

      return {
        title: get(note, "title"),
        description,
        images: get(note, "image") ? [get(note, "image.key")] : [],
      };
    });
    addNotes({
      notes: paylaod,
      parent_id: get(collection, "id"),
    });
  };

  const onImageUpload = (imageObj: any, index: any) => {
    setLoading(true);
    const payload = form.getFieldsValue();
    let indexObj = get(payload, `notes.${index}`);
    indexObj = isUndefined(indexObj) ? {} : indexObj;
    assign(indexObj, { image: imageObj });
    payload["notes"][index] = indexObj;
    form.setFieldsValue(payload);
    setLoading(false);
  };

  return (
    <Modal
      centered
      visible={visible}
      destroyOnClose
      footer={false}
      maskClosable={false}
      onCancel={onCancel}
      wrapClassName="note-modal-style primary-modal-style"
      maskStyle={{ background: "rgba(30,38,94, 0.6)" }}
    >
      <Spin spinning={loading}>
        <div className="card-modal">
          <div className="top-button-section">
            <Button onClick={onCancel} className="btn-outline">
              <img src={iconArrowLeft} alt="" /> Back
            </Button>
          </div>

          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="">Adding in Collections</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{get(collection, "name")}</Breadcrumb.Item>
          </Breadcrumb>

          <Form
            name="multiple_notes"
            onFinish={onFinish}
            autoComplete="off"
            form={form}
          >
            <Form.List name="notes" initialValue={[undefined]}>
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Row gutter={16}>
                      <Col xl={22}>
                        <Card
                          size="small"
                          style={{
                            width: "100%",
                            margin: "10px",
                            minHeight: 100,
                          }}
                        >
                          <Row gutter={16}>
                            <Col xl={1}>{name + 1}.</Col>
                            <Col xl={9}>
                              <Form.Item
                                {...restField}
                                name={[name, "title"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter Heading",
                                  },
                                ]}
                              >
                                <Input placeholder="Heading" />
                              </Form.Item>
                            </Col>
                            <Col xl={10}>
                              <Form.Item
                                {...restField}
                                name={[name, "description"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter description",
                                  },
                                ]}
                              >
                                <Input.TextArea
                                  style={{ height: 46 }}
                                  placeholder="Description"
                                />
                              </Form.Item>
                            </Col>
                            <Col xl={4}>
                              <Form.Item {...restField} name={[name, "image"]}>
                                <SingleImageUpload
                                  onUploadDone={(obj: any) =>
                                    onImageUpload(obj, name)
                                  }
                                  setLoading={setLoading}
                                  loading={loading}
                                  imageUrl={get(
                                    form.getFieldsValue(),
                                    `notes.${name}.image.url`,
                                    null
                                  )}
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                        </Card>
                      </Col>
                      <Col xl={2} className="note-remove-icon-container">
                        {console.log("fields.length", fields.length)}
                        {fields.length > 1 && (
                          <Tooltip title="Remove Note">
                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </Tooltip>
                        )}
                      </Col>
                    </Row>
                  ))}
                  <Form.Item>
                    <ButtonCustom
                      onClick={() => add()}
                      block
                      className="round-sm-primary-full-width"
                      title="Add Note"
                      icon={<PlusOutlined />}
                    />
                  </Form.Item>
                </>
              )}
            </Form.List>
            <div className={`button-custom`}>
              <Button
                type="primary"
                className="button-text-align"
                block
                htmlType="submit"
              >
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </Spin>
    </Modal>
  );
}

export default CreateMultipleNoteModal;
