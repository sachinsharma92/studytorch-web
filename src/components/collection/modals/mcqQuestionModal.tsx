import { Modal, Radio, Row, Col, Tag, Dropdown, Menu } from 'antd';
import verticalDot from "../../../assets/images/icons/vertical-dot.svg";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

// Styles
import './styles.scss';

function McqQuestionModal(props: any) {

  return (
    <Modal
      centered
      visible={props.visible}
      footer={false}
      onCancel={props.onCancel}
      wrapClassName="mcq-question-style primary-modal-style"
      maskStyle={{ background: 'rgba(30,39,94, 0.6)' }}
    >
      <div className="card-modal">
        <h3 className="title3">Quiz Name</h3>
        <div className="question-section">
          <div className="tag-section">
            <Tag className="tag-style">Objective  MCQ</Tag>
          </div>
          <Row>
            <Col sm={20}>
              <h4 className="title4">Name the seventh planet from the sun?</h4>
            </Col>

            <Col sm={4}>
              <div className="button-menu">
                <Dropdown overlayClassName="collection-dropdown" placement="bottomRight" overlay={
                  <Menu>
                    <Menu.Item icon={<EditOutlined />}>
                      <a target="_blank" rel="noopener noreferrer" href="#">
                        Edit
                      </a>
                    </Menu.Item>
                    <Menu.Item icon={<DeleteOutlined />}>
                      <a target="_blank" rel="noopener noreferrer" href="#">
                        Delete
                      </a>
                    </Menu.Item>
                  </Menu>

                }>
                  <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    <img src={verticalDot} />
                  </a>
                </Dropdown>
              </div>
            </Col>
          </Row>

          <Row>

            <Col sm={10}>
              <Radio.Group defaultValue="uranus" buttonStyle="solid">
                <Row gutter={24} className="question-row">
                  <Col sm={24}>
                    <Radio.Button value="uranus">Uranus</Radio.Button>
                  </Col>
                  <Col sm={24}>
                    <Radio.Button value="earth">Earth</Radio.Button>
                  </Col>
                  <Col sm={24}>
                    <Radio.Button value="neptune">Neptune</Radio.Button>
                  </Col>
                  <Col sm={24}>
                    <Radio.Button value="pluto">Pluto</Radio.Button>
                  </Col>
                </Row>
              </Radio.Group>
            </Col>
          </Row>
        </div>
      </div>
    </Modal>
  )
}

export default McqQuestionModal;