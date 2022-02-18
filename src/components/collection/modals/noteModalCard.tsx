import { useEffect, useState } from 'react';

import map from 'lodash/map';
import { Editor } from 'react-draft-wysiwyg';
import {
  EditorState,
  convertToRaw,
  convertFromHTML,
  ContentState,
} from 'draft-js';
import get from 'lodash/get';
import { useDispatch } from 'react-redux';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import {
  Button,
  Modal,
  Breadcrumb,
  Dropdown,
  Menu,
  Form,
  Input,
  Row,
  Col,
  Select,
  notification,
  message,
  Spin,
} from 'antd';
import { DownloadOutlined, FileTextOutlined } from '@ant-design/icons';
import { createNote, updateNote } from '../../../redux/actions/noteActions';
// Images
import iconFullscreen from '../../../assets/images/icons/fullscreen.svg';
import iconMore from '../../../assets/images/icons/more-dircle.svg';
import iconArrowLeft from '../../../assets/images/icons/caret-Left.svg';
import ButtonCustom from '../../../common/buttons/buttonCustom';
import {
  CREATE_NOTE_SUCCESS,
  UPDATE_NOTE_SUCCESS,
} from '../../../constants/messages';

// Styles
import './styles.scss';

const menu = (
  <Menu>
    <Menu.Item icon={<DownloadOutlined />}>
      <a target="_blank" rel="noopener noreferrer" href="#">
        Donwload PDF
      </a>
    </Menu.Item>
    <Menu.Item icon={<FileTextOutlined />}>
      <a target="_blank" rel="noopener noreferrer" href="#">
        Print
      </a>
    </Menu.Item>
  </Menu>
);

function NoteModalCard(props: any) {
  const { collection, onSuccess, edit, onCancel, initialValue, visible } =
    props;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [editorState, setEditorState] = useState<any>(
    EditorState.createEmpty()
  );

  useEffect(() => {
    if (visible && edit) {
      const blocksFromHTML = convertFromHTML(get(initialValue, 'description'));

      const contentState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );

      setEditorState(EditorState.createWithContent(contentState));
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
    dispatch(updateNote(get(initialValue, 'id'), payload))
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
        description: draftToHtml(convertToRaw(editorState.getCurrentContent())),
        parent_id: get(collection, 'id'),
      });
    } else {
      addNotes({
        ...values,
        description: draftToHtml(convertToRaw(editorState.getCurrentContent())),
        parent_id: get(collection, 'id'),
      });
    }
  };
  const onFinishFailed = () => {};

  const [isNoteViewModal, setNoteViewModal] = useState(false);
  const noteViewToggleModal = () => {
    setNoteViewModal(!isNoteViewModal);
  };

  return (
    <Modal
      centered
      visible={visible}
      destroyOnClose
      footer={false}
      onCancel={onCancel}
      wrapClassName="note-modal-style primary-modal-style"
      maskStyle={{ background: 'rgba(30,38,94, 0.6)' }}
    >
      <Spin spinning={loading}>
        <div className="card-modal">
          <div className="top-button-section">
            <Button onClick={onCancel} className="btn-outline">
              <img src={iconArrowLeft} alt="" /> Back
            </Button>
            <div className="action-sec">
              <Button href={props.buttonHandler}>
                <img src={iconFullscreen} alt="" />
              </Button>

              <Dropdown
                overlayClassName="collection-dropdown"
                overlay={menu}
                placement="bottomRight"
              >
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  <img src={iconMore} className="icon-style" />
                </a>
              </Dropdown>
            </div>
          </div>

          <Breadcrumb>
            <Breadcrumb.Item>
              <a href="">Adding in Collections</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{get(collection, 'name')}</Breadcrumb.Item>
          </Breadcrumb>

          <Form
            name="basic"
            initialValues={
              edit
                ? {
                    title: get(initialValue, 'title'),
                    tags: get(initialValue, 'tags'),
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
                        message: 'Please input note heading !',
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
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </div>
              </Col>
              <div className="editor-section">
                <Editor
                  editorState={editorState}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={(value) => {
                    setEditorState(value);
                  }}
                />
              </div>

              <div className="button-bottom-section">
                <ButtonCustom
                  onClick={onCancel}
                  className="round-sm-primary"
                  title="Cancel"
                />

                <div className={`button-custom ${props.btnContainer}`}>
                  <Button type="primary" htmlType="submit" title="Add Notes">
                    {edit ? 'Update Note' : 'Add Notes'}
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
