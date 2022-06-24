import {
  Button,
  Col,
  Divider,
  Modal,
  Progress,
  Descriptions,
  Spin,
  Row,
  Input,
  Image,
  Space,
  Checkbox,
} from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { READ_NOTE_SCREEN } from "../../../router/routes";
import {
  ClockCircleOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  ArrowRightOutlined,
} from "@ant-design/icons";
import get from "lodash/get";
import map from "lodash/map";
import isEqual from "lodash/isEqual";
import { LeftOutlined } from "@ant-design/icons";
import { fetchQuizDetails } from "../../../redux/actions/quizActions";
import { getTimeText, replaceMultiple } from "../../../utilities/helpers";
// Styles
import "./styles.scss";
import { useDispatch } from "react-redux";

const GetQuestion = (props: any) => {
  const { question, onSubmitAnswer } = props;
  const answerCorrect = isEqual(
    get(question, "answers", []),
    get(question, "submitted_answer")
  );

  return (
    <div className="question-section">
      <div className="question-container">
        <h4 className="title4">{get(question, "title")}</h4>
        <Link
          to={`${replaceMultiple(READ_NOTE_SCREEN, {
            ":id": get(question, "note.id"),
          })}?noBack=true`}
          target="_blank"
        >
          Go to Note <ArrowRightOutlined />
        </Link>
      </div>
      {map(get(question, "images"), (image) => (
        <Image width={100} style={{ padding: 10 }} src={get(image, "url")} />
      ))}
      {get(question, "type.value") === 0 && (
        <Input.TextArea
          disabled
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
          className={
            answerCorrect
              ? "select-checkbox-style"
              : "select-wrong-checkbox-style"
          }
          disabled
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
      {answerCorrect ? (
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
        <>
          <div>
            <Descriptions bordered title=" " size={"default"}>
              <Descriptions.Item label="Correct Answer">
                {get(question, "answers", []).join(", ")}
              </Descriptions.Item>
            </Descriptions>
          </div>
          <div className="answer-sec wrong">
            <Space>
              <CloseCircleTwoTone
                className="question-icon"
                twoToneColor="red"
              />
              Wrong
            </Space>
          </div>
        </>
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
      maskStyle={{ background: "rgba(30,39,94, 0.6)" }}
    >
      <Spin spinning={loading}>
        <div className="card-modal">
          <Space split={<Divider type="vertical" />} size="large">
            <h3 className="title3">{get(quiz, "name")}</h3>
            <div className="scrore-sec">
              Score : {get(quiz, "correct_answer")}
            </div>
          </Space>
          <div className="time-status-section">
            <span className="theme-color">
              <ClockCircleOutlined />{" "}
              {getTimeText(
                get(quizDetails, "total_time")
                  ? get(quizDetails, "total_time")
                  : 0
              )}
            </span>
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
                  get(quizDetails, "total_question")
                ) {
                  onCancel();
                } else {
                  setCurrentQuestion(currentQuestion + 1);
                }
              }}
            >
              {currentQuestion + 1 === get(quizDetails, "total_question")
                ? "Close"
                : "Next Question"}
            </Button>
          </div>
        </div>
      </Spin>
    </Modal>
  );
}

export default CheckSolutionModal;
