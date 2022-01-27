import { Button, Col, Modal, Row } from 'antd';
import goldMedal from "../../../assets/images/icons/gold-medal.svg";

// Styles
import './styles.scss';

function QuizResultModal(props: any) {

  return (
    <Modal
      centered
      visible={props.visible}
      footer={false}
      onCancel={props.onCancel}
      wrapClassName="quiz-result-style primary-modal-style"
      maskStyle={{ background: 'rgba(30,39,94, 0.6)' }}
    >

      <div className="card-modal">
        <div className="bg-light-blue">
          <img src={goldMedal} alt="" />
          <h1 className="title1">Congratulations !</h1>
          <p className="description">
            You Finished Completed your Quiz in <span className="theme-color"> 20:40 </span>
          </p>

          <div className="row-section">
            <Row>
              <Col sm={8}>
                <div className="text-box">
                <div className="label">Attempt</div>
                <div className="text">18</div>
                </div>
              </Col>
              <Col sm={8}>
              <div className="text-box">
                <div className="label">Correct</div>
                <div className="text">16</div>
                </div>
              </Col>
              <Col sm={8}>
              <div className="text-box">
                <div className="label">Incorrect</div>
                <div className="text">02</div>
                </div>
              </Col>
            </Row>
          </div>
        </div>

        <div className="button-section">
          Your Scored
          <div className="title-result">
            <span> 80</span>/100
          </div>
          <Button type="primary" onClick={props.buttonHandler}>Take Another Quiz</Button>
        </div>

      </div>

    </Modal>
  )
}

export default QuizResultModal;