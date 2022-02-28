import { Button, Col, Modal, Row, Spin } from 'antd';
import get from 'lodash/get';
import goldMedal from '../../../assets/images/icons/gold-medal.svg';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchQuizDetails } from '../../../redux/actions/quizActions';
// Styles
import './styles.scss';
import { remove } from 'lodash';

function QuizResultModal(props: any) {
  const { quiz } = props;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [quizDetails, setQuizDetails] = useState(null);

  const getQuizDetails = () => {
    setLoading(true);
    dispatch(fetchQuizDetails(get(quiz, 'id')))
      .then((result: any) => {
        setQuizDetails(result);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getQuizDetails();
  }, []);

  const getQuestionStats = () => {
    if (!quizDetails) {
      return {
        attempted: 0,
        correct: 0,
        incorrect: 0,
      };
    } else {
      const questions = [...get(quizDetails, 'questions')];
      remove(questions, (q) => get(q, 'submitted_answer', []).length === 0);
      return {
        attempted: questions.length,
        correct: get(quizDetails, 'correct_answer'),
        incorrect: questions.length - get(quizDetails, 'correct_answer'),
      };
    }
  };

  const questionStats = getQuestionStats();

  return (
    <Modal
      centered
      visible={props.visible}
      footer={false}
      onCancel={props.onCancel}
      wrapClassName="quiz-result-style primary-modal-style"
      maskStyle={{ background: 'rgba(30,39,94, 0.6)' }}
    >
      <Spin spinning={loading}>
        <div className="card-modal">
          <div className="bg-light-blue">
            <img src={goldMedal} alt="" />
            <h1 className="title1">Congratulations !</h1>
            <p className="description">
              You Finished Completed your Quiz in{' '}
              <span className="theme-color"> 20:40 </span>
            </p>

            <div className="row-section">
              <Row>
                <Col sm={8}>
                  <div className="text-box">
                    <div className="label">Attempt</div>
                    <div className="text">
                      {get(questionStats, 'attempted')}
                    </div>
                  </div>
                </Col>
                <Col sm={8}>
                  <div className="text-box">
                    <div className="label">Correct</div>
                    <div className="text">{get(questionStats, 'correct')}</div>
                  </div>
                </Col>
                <Col sm={8}>
                  <div className="text-box">
                    <div className="label">Incorrect</div>
                    <div className="text">
                      {get(questionStats, 'incorrect')}
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>

          <div className="button-section">
            Your Scored
            <div className="title-result">
              <span> {get(quizDetails, 'correct_answer')}</span>/
              {get(quizDetails, 'questions', []).length}
            </div>
            <Button type="primary" onClick={props.onCancel}>
              Take Another Quiz
            </Button>
          </div>
        </div>
      </Spin>
    </Modal>
  );
}

export default QuizResultModal;
