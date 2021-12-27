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
function QuestionModal(props: any) {

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
      wrapClassName="question-modal-style primary-modal-style"
      maskStyle={{ background: 'rgba(30,38,94, 0.6)' }}
    >

      <div className="card-modal">
        <div className="top-button-section">
          <Button href={props.onBack} className="btn-outline"><img src={iconArrowLeft} /> Back</Button>
        </div>
        <h3 className="title3">Add Question</h3>

        <div className="main-content-section">
          <h1 className="title1 fade-style">Question Title....</h1>

          <Tabs defaultActiveKey="1" className="tab-button-style">
            <TabPane tab="Text" key="1">
              <h4 className="title4 fade-style">
                You answer should come here....
              </h4>
            </TabPane>
            <TabPane tab="MCQs" key="2">
              <div className="select-radio-section">
                <Radio.Group onChange={onChange} value={value}>
                  <Radio value={1}>Single answer</Radio>
                  <Radio value={2}>Multiple answer</Radio>
                </Radio.Group>
              </div>

              <div className="select-value">
                <Select placeholder="No. of options" onChange={handleChange}>
                  <Option value="four">4</Option>
                  <Option value="five">5</Option>
                  <Option value="six">6</Option>
                </Select>
              </div>

              <div className="question-list">
                <Checkbox.Group style={{ width: "30%" }} onChange={onCheckChange}>
                  <Row>
                    <Col span={24}>
                      <Checkbox value="A">A <span className="text-span">Option 1</span></Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox value="B">B <span className="text-span">Option 2</span></Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox value="C">C  <span className="text-span">Option 3</span></Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox value="D">D  <span className="text-span">Option 4</span></Checkbox>
                    </Col>
                    <Col span={24}>
                      <Checkbox value="E">E  <span className="text-span">Option 5</span></Checkbox>
                    </Col>
                  </Row>
                </Checkbox.Group>
              </div>
            </TabPane>
          </Tabs>
        </div>


        <div className="button-bottom-section">
          <ButtonCustom onClick={props.cancelHandler} className="round-sm-primary" title="Cancel" />
          <ButtonCustom type='primary' onClick={props.addHandler} title="Submit" />
        </div>
      </div>

    </Modal>
  )
}

export default QuestionModal;