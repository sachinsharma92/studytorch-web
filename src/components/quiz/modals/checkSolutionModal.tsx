import {
  Button,
  Col,
  Divider,
  Modal,
  Progress,
  Radio,
  Spin,
  Row,
  Input,
  Image,
  Space,
} from 'antd';
import { useEffect, useState } from 'react';
import {
  ClockCircleOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
} from '@ant-design/icons';
import get from 'lodash/get';
import map from 'lodash/map';
import isEqual from 'lodash/isEqual';
import { LeftOutlined } from '@ant-design/icons';
import { fetchQuizDetails } from '../../../redux/actions/quizActions';
import { getTimeText } from '../../../utilities/helpers';
// Styles
import './styles.scss';
import { useDispatch } from 'react-redux';

const GetQuestion = (props: any) => {
  const { question, onSubmitAnswer } = props;
  return (
    <div className="question-section">
      <h4 className="title4">{get(question, 'title')}</h4>
      {map(get(question, 'images'), (image) => (
        <Image width={100} style={{ padding: 10 }} src={get(image, 'url')} />
      ))}
      {get(question, 'type.value') === 0 && (
        <Input.TextArea
          disabled
          rows={4}
          onChange={(e) => {
            onSubmitAnswer(e.target.value ? [e.target.value] : []);
          }}
          placeholder="Answer"
          value={get(question, 'submitted_answer.0')}
        />
      )}
      {(get(question, 'type.value') === 1 ||
        get(question, 'type.value') === 2) && (
        <Radio.Group
          disabled
          value={get(question, 'submitted_answer.0')}
          buttonStyle="solid"
        >
          <Row gutter={24} className="question-row">
            {map(get(question, 'options'), (option) => {
              return (
                <Col sm={12}>
                  <Radio.Button value={option}>{option}</Radio.Button>
                </Col>
              );
            })}
          </Row>
        </Radio.Group>
      )}
      {isEqual(
        get(question, 'answers', []),
        get(question, 'submitted_answer')
      ) ? (
        <div className="answer-sec correct">
          <Space>
            <CheckCircleTwoTone
              className="question-icon"
              twoToneColor="#52c41a"
            />
            Correct
          </Space>
        </div>
      ) : (
        <div className="answer-sec wrong">
          <Space>
            <CloseCircleTwoTone className="question-icon" twoToneColor="red" />
            Wrong
          </Space>
        </div>
      )}
    </div>
  );
};

function CheckSolutionModal(props: any) {
  const { quiz, onCancel } = props;
  const dispatch = useDispatch();
  const [quizDetails, setQuizDetails] = useState(null);
  const [questions, setQuestions] = useState<any>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(false);

  const getQuestionDetails = (id: any) => {
    setLoading(true);
    dispatch(fetchQuizDetails(id))
      .then((result: any) => {
        setQuizDetails(result);
        const questions = map(get(result, 'questions', []), (q) => {
          let obj = {
            ...q,
            submitted_answer: get(q, 'submitted_answer')
              ? get(q, 'submitted_answer')
              : [],
          };
          return obj;
        });
        setQuestions(questions);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getQuestionDetails(get(quiz, 'id'));
  }, []);

  const onModalCancel = () => {
    onCancel();
  };

  return (
    <Modal
      centered
      visible={props.visible}
      destroyOnClose
      footer={false}
      onCancel={onModalCancel}
      wrapClassName="quiz-modal-style primary-modal-style"
      maskStyle={{ background: 'rgba(30,39,94, 0.6)' }}
    >
      <Spin spinning={loading}>
        <div className="card-modal">
          <Space split={<Divider type="vertical" />} size="large">
            <h3 className="title3">{get(quiz, 'name')}</h3>
            <div className="scrore-sec">
              Score : {get(quiz, 'correct_answer')}
            </div>
          </Space>
          <div className="time-status-section">
            <span className="theme-color">
              <ClockCircleOutlined />{' '}
              {getTimeText(
                get(quizDetails, 'total_time')
                  ? get(quizDetails, 'total_time')
                  : 0
              )}
            </span>
            <span className="space-style">|</span>{' '}
            <span>{`Question ${currentQuestion + 1} / ${get(
              quizDetails,
              'total_question'
            )}`}</span>
          </div>
          <div className="progress-style">
            <Progress
              percent={
                get(quizDetails, 'total_question', 0) > 0
                  ? ((currentQuestion + 1) /
                      get(quizDetails, 'total_question', 0)) *
                    100
                  : 0
              }
            />
          </div>
          <GetQuestion question={get(questions, currentQuestion)} />
          <div className="button-section">
            <Button
              type="primary"
              danger
              onClick={() => {
                if (currentQuestion !== 0) {
                  setCurrentQuestion(currentQuestion - 1);
                }
              }}
            >
              <LeftOutlined /> Previous
            </Button>

            {/* <Button type="primary" danger onClick={props.saveHandler}>Save & Next <RightOutlined /></Button> */}
            <Button
              type="primary"
              onClick={() => {
                if (
                  currentQuestion + 1 ===
                  get(quizDetails, 'total_question')
                ) {
                  onCancel();
                } else {
                  setCurrentQuestion(currentQuestion + 1);
                }
              }}
            >
              {currentQuestion + 1 === get(quizDetails, 'total_question')
                ? 'Close'
                : 'Next Question'}
            </Button>
          </div>
        </div>
      </Spin>
    </Modal>
  );
}

export default CheckSolutionModal;
