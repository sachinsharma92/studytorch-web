import { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import get from "lodash/get";
import map from "lodash/map";
import { useDispatch } from "react-redux";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import {
  Button,
  Modal,
  Breadcrumb,
  Form,
  Input,
  Row,
  Col,
  Select,
  message,
  Spin,
} from "antd";
import { createNote, updateNote } from "../../../redux/actions/noteActions";
// Images

import iconArrowLeft from "../../../assets/images/icons/caret-Left.svg";
import ButtonCustom from "../../../common/buttons/buttonCustom";
import QuestionImageUpload from "../../../components/questionImageUpload";
import {
  CREATE_NOTE_SUCCESS,
  UPDATE_NOTE_SUCCESS,
} from "../../../constants/messages";

// Styles
import "./styles.scss";

function NoteModalCard(props: any) {
  const { collection, onSuccess, edit, onCancel, initialValue, visible } =
    props;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [images, setImages] = useState<any[]>(
    edit ? get(initialValue, "images", []) : []
  );

  const [editorState, setEditorState] = useState<any>(
    EditorState.createEmpty()
  );

  useEffect(() => {
    if (visible && edit) {
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(get(initialValue, "description"))
        )
      );
    }
  }, [visible]);

  const addNotes = (payload: any) => {
    setLoading(true);
    dispatch(createNote(payload))
      .then(() => {
        onSuccess();
        message.success(CREATE_NOTE_SUCCESS);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const editNotes = (payload: any) => {
    setLoading(true);
    dispatch(updateNote(get(initialValue, "id"), payload))
      .then(() => {
        onSuccess();
        message.success(UPDATE_NOTE_SUCCESS);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onFinish = (values: any) => {
    if (edit) {
      editNotes({
        ...values,
        description: convertToRaw(editorState.getCurrentContent()),
        parent_id: get(collection, "id"),
        images: map(images, "key"),
      });
    } else {
      addNotes({
        ...values,
        description: convertToRaw(editorState.getCurrentContent()),
        parent_id: get(collection, "id"),
        images: map(images, "key"),
      });
    }
  };
  const onFinishFailed = () => {};
  console.log({
    title: get(initialValue, "title"),
    tags: get(initialValue, "tags") ? get(initialValue, "tags") : undefined,
  });
  return (
    <Modal
      centered
      visible={visible}
      destroyOnClose
      footer={false}
      maskClosable={false}
      onCancel={() => {}}
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
            name="basic"
            initialValues={
              edit
                ? {
                    title: get(initialValue, "title"),
                    tags: get(initialValue, "tags")
                      ? get(initialValue, "tags")
                      : [],
                  }
                : {}
            }
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Row gutter={16}>
              <Col span={12}>
                <div className="input-section">
                  <div className="label">Heading </div>
                  <Form.Item
                    name="title"
                    rules={[
                      {
                        required: true,
                        message: "Please input note heading !",
                      },
                    ]}
                  >
                    <Input placeholder="Heading" />
                  </Form.Item>
                </div>
              </Col>
              <Col span={12}>
                <div className="input-section">
                  <div className="label">Tags</div>
                  <Form.Item
                    name="tags"
                    rules={[]}
                    extra="Press enter to add tags"
                  >
                    <Select
                      mode="tags"
                      size="large"
                      placeholder="Please select"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </div>
              </Col>
              <div className="editor-section">
                <Editor
                  editorState={editorState}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                  toolbar={{
                    options: [
                      "inline",
                      "blockType",
                      "fontSize",
                      "list",
                      "textAlign",
                      "history",
                      "emoji",
                      "image",
                      "remove",
                      "colorPicker",
                      "link",
                    ],
                    list: {
                      inDropdown: false,
                      className: undefined,
                      component: undefined,
                      dropdownClassName: undefined,
                      options: ["unordered", "ordered", "indent", "outdent"],
                    },
                  }}
                  onEditorStateChange={(value) => {
                    setEditorState(value);
                  }}
                />
              </div>
              <div className="image-upload-container">
                <Row>
                  <Col xl={24}>
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
                  onClick={onCancel}
                  className="round-sm-primary"
                  title="Cancel"
                />

                <div className={`button-custom ${props.btnContainer}`}>
                  <Button type="primary" htmlType="submit" title="Add Notes">
                    {edit ? "Update Note" : "Add Notes"}
                  </Button>
                </div>
              </div>
            </Row>
          </Form>
        </div>
      </Spin>
    </Modal>
  );
}

export default NoteModalCard;
