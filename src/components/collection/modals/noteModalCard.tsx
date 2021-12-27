import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, Modal, Breadcrumb, Dropdown, Menu } from 'antd';
import { DownloadOutlined, FileTextOutlined } from '@ant-design/icons';

// Images
import iconFullscreen from "../../../assets/images/icons/fullscreen.svg";
import iconMore from "../../../assets/images/icons/more-dircle.svg";
import iconArrowLeft from "../../../assets/images/icons/caret-Left.svg";
import ButtonCustom from '../../../common/buttons/buttonCustom';

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

  return (
    <Modal
      centered
      visible={props.visible}
      footer={false}
      onCancel={props.onCancel}
      wrapClassName="note-modal-style primary-modal-style"
      maskStyle={{ background: 'rgba(30,38,94, 0.6)' }}
    >

      <div className="card-modal">
        <div className="top-button-section">
          <Button href={props.onBack} className="btn-outline"><img src={iconArrowLeft} /> Back</Button>
          <div className="action-sec">
            <Button href={props.buttonHandler}>
              <img src={iconFullscreen} />
            </Button>

            <Dropdown overlayClassName="collection-dropdown" overlay={menu} placement="bottomRight">
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                <img src={iconMore} className="icon-style" />
              </a>
            </Dropdown>

          </div>
        </div>

        <Breadcrumb>
          <Breadcrumb.Item>
            <a href="">Adding in Collections</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Chemistry</Breadcrumb.Item>
        </Breadcrumb>

        <div className="editor-section">
          <Editor
            // editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
          // onEditorStateChange={this.onEditorStateChange}
          />
        </div>

        <div className="button-bottom-section">
          <ButtonCustom onClick={props.cancelHandler} className="round-sm-primary" title="Cancel" />
          <ButtonCustom type='primary' onClick={props.addHandler} title="Add Notes" />
        </div>
      </div>

    </Modal>
  )
}

export default NoteModalCard;