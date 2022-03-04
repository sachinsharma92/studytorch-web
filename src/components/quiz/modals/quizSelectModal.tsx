import {
  Button,
  Col,
  Modal,
  Progress,
  Radio,
  Spin,
  Row,
  Input,
  Image,
  Descriptions,
  message,
} from 'antd';
import { useEffect, useState } from 'react';
import get from 'lodash/get';
import map from 'lodash/map';
import {
  ClockCircleOutlined,
  LeftOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import {
  fetchQuizDetails,
  submitQuiz,
} from '../../../redux/actions/quizActions';
import { SUBMIT_QUIZ_SUCCESS } from '../../../constants/messages';

// Styles
import './styles.scss';
import { useDispatch } from 'react-redux';

const { confirm } = Modal;

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
          value={get(question, 'submitted_answer.0')}
          onChange={(e) => {
            onSubmitAnswer([e.target.value]);
          }}
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
    </div>
  );
};

function QuizSelectModal(props: any) {
  const { quiz, onSuccessSubmit, onCancel } = props;
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
          return { ...q, submitted_answer: [] };
        });

        setQuestions(questions);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  console.log('======>quizDetails', questions);

  useEffect(() => {
    getQuestionDetails(get(quiz, 'id'));
  }, []);

  const onSubmitAnswer = (answer: any, index: any) => {
    questions[index]['submitted_answer'] = answer;
    setQuestions([...questions]);
  };

  const onSubmitQuiz = (payload: any) => {
    setLoading(true);

    dispatch(submitQuiz(get(quizDetails, 'id'), payload))
      .then(() => {
        setLoading(false);
        message.success(SUBMIT_QUIZ_SUCCESS);
        onSuccessSubmit(quizDetails);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onConifrmSubmitQuiz = () => {
    let attempted = 0;
    const payload = {
      responses: map(questions, (q) => {
        if (get(q, 'submitted_answer.0')) {
          attempted += 1;
        }
        return {
          uuid: get(q, 'id'),
          answer: get(q, 'submitted_answer'),
        };
      }),
    };

    confirm({
      title: 'Are you sure, You want to submit this quiz?',
      content: (
        <Descriptions title="Questions" bordered column={1}>
          <Descriptions.Item label="Total">
            {questions.length}
          </Descriptions.Item>
          <Descriptions.Item label="Attempted">{attempted}</Descriptions.Item>
          <Descriptions.Item label="Non Attempted">
            {questions.length - attempted}
          </Descriptions.Item>
        </Descriptions>
      ),
      icon: <ExclamationCircleOutlined />,

      onOk() {
        onSubmitQuiz(payload);
      },
      onCancel() {},
    });
  };

  const onModalCancel = () => {
    console.log('======>on leave modal', questions);
    onCancel();
  };

  return (
    <Modal
      centered
      visible={props.visible}
      footer={false}
      onCancel={onModalCancel}
      wrapClassName="quiz-modal-style primary-modal-style"
      maskStyle={{ background: 'rgba(30,39,94, 0.6)' }}
    >
      <Spin spinning={loading}>
        <div className="card-modal">
          <h3 className="title3">{get(quiz, 'name')}</h3>

          <div className="time-status-section">
            <span className="theme-color">
              <ClockCircleOutlined /> 2 mins 5s
            </span>{' '}
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

          <GetQuestion
            question={get(questions, currentQuestion)}
            onSubmitAnswer={(answer: any) => {
              onSubmitAnswer(answer, currentQuestion);
            }}
          />

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
                  onConifrmSubmitQuiz();
                } else {
                  setCurrentQuestion(currentQuestion + 1);
                }
              }}
            >
              {currentQuestion + 1 === get(quizDetails, 'total_question')
                ? 'Submit Quiz'
                : 'Next Question'}
            </Button>
          </div>
        </div>
      </Spin>
    </Modal>
  );
}

export default QuizSelectModal;
