import {
  Button,
  Col,
  Modal,
  Progress,
  Spin,
  Row,
  Input,
  Image,
  Descriptions,
  message,
  Checkbox,
} from "antd";
import isUndefined from "lodash/isUndefined";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import useWebSocket from "react-use-websocket";
import get from "lodash/get";
import map from "lodash/map";
import last from "lodash/last";
import QuizTime from "../quizTime";
import { LeftOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import {
  fetchQuizDetails,
  submitQuiz,
  submitQuizAnswer,
} from "../../../redux/actions/quizActions";
import { SUBMIT_QUIZ_SUCCESS } from "../../../constants/messages";

// Styles
import "./styles.scss";
import { useDispatch } from "react-redux";

const { confirm } = Modal;

const GetQuestion = (props: any) => {
  const { question, onSubmitAnswer } = props;

  return (
    <div className="question-section">
      <h4 className="title4">{get(question, "title")}</h4>
      {map(get(question, "images"), (image) => (
        <Image width={100} style={{ padding: 10 }} src={get(image, "url")} />
      ))}
      {get(question, "type.value") === 0 && (
        <Input.TextArea
          rows={4}
          onChange={(e) => {
            onSubmitAnswer(e.target.value ? [e.target.value] : []);
          }}
          placeholder="Answer"
          value={get(question, "submitted_answer.0")}
        />
      )}
      {(get(question, "type.value") === 1 ||
        get(question, "type.value") === 2) && (
        <Checkbox.Group
          value={get(question, "submitted_answer", [])}
          className="select-checkbox-style"
          onChange={(values) => {
            if (get(question, "type.value") === 1) {
              onSubmitAnswer([last(values)]);
            } else {
              onSubmitAnswer(values);
            }
          }}
        >
          <Row gutter={[20, 20]}>
            {map(get(question, "options"), (option) => {
              return (
                <Col span={12}>
                  <Checkbox value={option}>{option}</Checkbox>
                </Col>
              );
            })}
          </Row>
        </Checkbox.Group>
      )}

      {/* Dummy Add */}
    </div>
  );
};

function QuizSelectModal(props: any) {
  const { quiz, onSuccessSubmit, onCancel, refreshQuizData } = props;
  const dispatch = useDispatch();
  const [quizDetails, setQuizDetails] = useState(null);
  const [questions, setQuestions] = useState<any>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(false);
  const time = useRef(0);
  const token = useSelector((state) => get(state, "userState.accessToken"));

  const getQuestionDetails = (id: any) => {
    setLoading(true);
    dispatch(fetchQuizDetails(id))
      .then((result: any) => {
        setQuizDetails(result);
        const questions = map(get(result, "questions", []), (q) => {
          let obj = {
            ...q,
            submitted_answer: get(q, "submitted_answer")
              ? get(q, "submitted_answer")
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
    getQuestionDetails(get(quiz, "id"));
  }, []);

  const onSubmitAnswer = (answer: any, index: any) => {
    questions[index]["submitted_answer"] = answer;
    setQuestions([...questions]);
  };

  const onSubmitQuiz = (payload: any) => {
    setLoading(true);

    dispatch(
      submitQuiz(get(quizDetails, "id"), {
        time: get(time, "current"),
        ...payload,
      })
    )
      .then(() => {
        setLoading(false);
        message.success(SUBMIT_QUIZ_SUCCESS);
        onSuccessSubmit(quizDetails);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const { sendMessage } = useWebSocket(`${process.env.REACT_APP_WSS_HOST}`, {
    shouldReconnect: () => true,
    protocols: token,
    retryOnError: true,
  });

  const sendEvent = (t: any) => {
    if (quizDetails) {
      sendMessage(
        JSON.stringify({
          type: "quiz",
          uuid: get(quizDetails, "id"),
          time: t,
        })
      );
    }
  };

  const onConifrmSubmitQuiz = () => {
    let attempted = 0;
    const payload = {
      responses: map(questions, (q) => {
        if (get(q, "submitted_answer.0")) {
          attempted += 1;
        }
        return {
          uuid: get(q, "id"),
          answer: get(q, "submitted_answer"),
        };
      }),
    };

    confirm({
      title: "Are you sure, You want to submit this quiz?",
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

  const updateQuizAnswer = () => {
    const responses: any[] = [];

    map(questions, (q) => {
      if (get(q, "submitted_answer", []).length > 0) {
        responses.push({
          uuid: get(q, "id"),
          answer: get(q, "submitted_answer"),
        });
      }
    });

    dispatch(submitQuizAnswer(get(quizDetails, "id"), { responses }))
      .then(() => {
        refreshQuizData();
      })
      .catch(() => {});
  };

  const onModalCancel = () => {
    updateQuizAnswer();
    const timeDiff =
      time.current -
      (get(quizDetails, "totalLogTime")
        ? parseInt(get(quizDetails, "totalLogTime", "0"))
        : 0);

    sendEvent(timeDiff % 30);
    onCancel();
  };

  const moveForward = () => {
    setCurrentQuestion((c) => {
      if (c < questions.length - 1) {
        return c + 1;
      } else {
        onConifrmSubmitQuiz();
        return c;
      }
    });
  };

  const onKeyPressFunction = (event: any) => {
    if (
      isUndefined(get(event, "target.type")) &&
      get(event, "keyCode") === 13
    ) {
      moveForward();
    }
  };

  useEffect(() => {
    if (questions.length === 0) {
      return;
    }

    // @ts-ignore: Unreachable code error
    document.addEventListener("keydown", onKeyPressFunction);
    return () => {
      // @ts-ignore: Unreachable code error
      document.removeEventListener("keydown", onKeyPressFunction);
    };
  }, [questions]);

  return (
    <Modal
      centered
      visible={props.visible}
      destroyOnClose
      footer={false}
      onCancel={onModalCancel}
      wrapClassName="quiz-modal-style primary-modal-style"
      maskStyle={{ background: "rgba(30,39,94, 0.6)" }}
    >
      <Spin spinning={loading}>
        <div className="card-modal">
          <h3 className="title3">{get(quiz, "name")}</h3>

          <div className="time-status-section">
            {quizDetails && (
              <QuizTime
                time={time}
                sendEvent={sendEvent}
                quizDetails={quizDetails}
              />
            )}
            <span className="space-style">|</span>{" "}
            <span>{`Question ${currentQuestion + 1} / ${get(
              quizDetails,
              "total_question"
            )}`}</span>
          </div>

          <div className="progress-style">
            <Progress
              percent={
                get(quizDetails, "total_question", 0) > 0
                  ? ((currentQuestion + 1) /
                      get(quizDetails, "total_question", 0)) *
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
                  get(quizDetails, "total_question")
                ) {
                  onConifrmSubmitQuiz();
                } else {
                  setCurrentQuestion(currentQuestion + 1);
                }
              }}
            >
              {currentQuestion + 1 === get(quizDetails, "total_question")
                ? "Submit Quiz"
                : "Next Question"}
            </Button>
          </div>
        </div>
      </Spin>
    </Modal>
  );
}

export default QuizSelectModal;
