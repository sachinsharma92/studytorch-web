import { Button, Col, Modal, Progress, Radio, Row } from 'antd';
import { ClockCircleOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';

// Styles
import './styles.scss';

function QuizSelectModal(props: any) {

  return (
    <Modal
      centered
      visible={props.visible}
      footer={false}
      onCancel={props.onCancel}
      wrapClassName="quiz-modal-style primary-modal-style"
      maskStyle={{ background: 'rgba(30,39,94, 0.6)' }}
    >

      <div className="card-modal">
        <h3 className="title3">Quiz Name</h3>

        <div className="time-status-section">
          <span className="theme-color"><ClockCircleOutlined /> 2 mins 5s</span> <span className="space-style">|</span> <span>Question 20 / 20</span>
        </div>

        <div className="progress-style">
          <Progress percent={30} />
        </div>

        <div className="question-section">
          <h4 className="title4">Name the seventh planet from the sun?</h4>

          <Radio.Group defaultValue="uranus" buttonStyle="solid">
            <Row gutter={24} className="question-row">
              <Col sm={12}>
                <Radio.Button value="uranus">Uranus</Radio.Button>
              </Col>
              <Col sm={12}>
                <Radio.Button value="earth">Earth</Radio.Button>
              </Col>
              <Col sm={12}>
                <Radio.Button value="neptune">Neptune</Radio.Button>
              </Col>
              <Col sm={12}>
                <Radio.Button value="pluto">Pluto</Radio.Button>
              </Col>
            </Row>
          </Radio.Group>
        </div>

        <div className="button-section">
          <Button type="primary" danger onClick={props.previusHandler}><LeftOutlined /> Previus</Button>
          {/* <Button type="primary" danger onClick={props.saveHandler}>Save & Next <RightOutlined /></Button> */}
          <Button type="primary" onClick={props.submitHandler}>Submit Quiz</Button>
        </div>
      </div>

    </Modal>
  )
}

export default QuizSelectModal;