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
import { useState } from "react";

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

  const [isNoteViewModal, setNoteViewModal] = useState(false);
  const noteViewToggleModal = () => {
    setNoteViewModal(!isNoteViewModal);
  };

  return (
    <>
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
            <Button onClick={props.onBack} className="btn-outline"><img src={iconArrowLeft} /> Back</Button>
            <div className="action-sec">
              <Button href="/collection/note">
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
            <ButtonCustom type='primary' onClick={noteViewToggleModal} title="Add Notes" />
          </div>
        </div>

      </Modal>

      <Modal
        centered
        visible={isNoteViewModal}
        footer={false}
        onCancel={noteViewToggleModal}
        wrapClassName="note-modal-style primary-modal-style"
        maskStyle={{ background: 'rgba(30,38,94, 0.6)' }}
      >

        <div className="card-modal">
          <div className="top-button-section">
            <Button onClick={noteViewToggleModal} className="btn-outline"><img src={iconArrowLeft} /> Back</Button>
            <div className="action-sec">
              <Button href="/collection/note">
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

          <div className="view-section">
            <h1 className="title1">Inorganic chemistry</h1>
            <h3 className="title3">1.Review of Chemical Bonding</h3>
            <h4 className="title4">1.1 Prelude to Chemical Bonding</h4>

            <p className="description">
              Inorganic chemistry is the study of the synthesis, reactions, structures and properties of compounds of the elements. Inorganic chemistry encompasses the compounds - both molecular and extended solids - of everything else in the periodic table, and overlaps with organic chemistry in the area of organometallic chemistry, in which metals are bonded to carbon-containing ligands and molecules. Inorganic chemistry is fundamental to many practical technologies including catalysis and materials (structural, electronic, magnetic etc.), energy conversion and storage, and electronics. Inorganic compounds are also found in biological systems where they are essential to life processes.
            </p>

            <p className="description">
              Inorganic chemistry is the study of the synthesis, reactions, structures and properties of compounds of the elements. Inorganic chemistry encompasses the compounds - both molecular and extended solids - of everything else in the periodic table, and overlaps with organic chemistry in the area of organometallic chemistry, in which metals are bonded to carbon-containing ligands and molecules. Inorganic chemistry is fundamental to many practical technologies including catalysis and materials (structural, electronic, magnetic etc.), energy conversion and storage, and electronics. Inorganic compounds are also found in biological systems where they are essential to life processes.
            </p>

            <p className="description">
              Inorganic chemistry is the study of the synthesis, reactions, structures and properties of compounds of the elements. Inorganic chemistry encompasses the compounds - both molecular and extended solids - of everything else in the periodic table, and overlaps with organic chemistry in the area of organometallic chemistry, in which metals are bonded to carbon-containing ligands and molecules. Inorganic chemistry is fundamental to many practical technologies including catalysis and materials (structural, electronic, magnetic etc.), energy conversion and storage, and electronics. Inorganic compounds are also found in biological systems where they are essential to life processes.
            </p>

            <p className="description">
              Inorganic chemistry is the study of the synthesis, reactions, structures and properties of compounds of the elements. Inorganic chemistry encompasses the compounds - both molecular and extended solids - of everything else in the periodic table, and overlaps with organic chemistry in the area of organometallic chemistry, in which metals are bonded to carbon-containing ligands and molecules. Inorganic chemistry is fundamental to many practical technologies including catalysis and materials (structural, electronic, magnetic etc.), energy conversion and storage, and electronics. Inorganic compounds are also found in biological systems where they are essential to life processes.
            </p>
          </div>
        </div>
      </Modal>

    </>
  )
}

export default NoteModalCard;