import { useState } from 'react';
import { Button, Modal, Menu, Tabs, Radio, Select, Checkbox, Row, Col } from 'antd';
import { DownloadOutlined, FileTextOutlined } from '@ant-design/icons';

// Images
import iconArrowLeft from "../../../assets/images/icons/caret-Left.svg";
import ButtonCustom from '../../../common/buttons/buttonCustom';

// Styles
import './styles.scss';

const { Option } = Select;

function handleChange(value: any) {
  console.log(`selected ${value}`);
}

const { TabPane } = Tabs;


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
function FlashEditModal(props: any) {

  const [value, setValue] = useState(1);

  const onChange = (e: any) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  function onCheckChange(checkedValues: any) {
    console.log('checked = ', checkedValues);
  }

  return (
    <Modal
      centered
      visible={props.visible}
      footer={false}
      onCancel={props.onCancel}
      wrapClassName="flash-edit-modal primary-modal-style"
      maskStyle={{ background: 'rgba(30,38,94, 0.6)' }}
    >

      <div className="card-modal">
        <div className="top-button-section">
          <Button onClick={props.backHandler} className="btn-outline"><img src={iconArrowLeft} /> Back</Button>
        </div>
        <h3 className="title3">Edit Flash Card</h3>

        <div className="main-content-section">
          <h2 className="title2">Inorganic chemistry</h2>
          <p className="description">
            Inorganic chemistry is the study of the synthesis, reactions, structures and properties of compounds of the elements. Inorganic chemistry encompasses the compounds - both molecular and extended solids - of everything else in the periodic table, and overlaps with organic chemistry in the area of organometallic chemistry, in which metals are bonded to carbon-containing ligands and molecules. Inorganic chemistry is fundamental to many practical technologies including catalysis and materials (structural, electronic, magnetic etc.), energy conversion and storage, and electronics. Inorganic compounds are also found in biological systems where they are essential to life processes.
          </p>
        </div>


        <div className="button-bottom-section">
          <ButtonCustom onClick={props.cancelHandler} className="round-sm-primary" title="Cancel" />
          <ButtonCustom type='primary' onClick={props.btnAddHandler} title="Add card" />
        </div>
      </div>

    </Modal>
  )
}

export default FlashEditModal;