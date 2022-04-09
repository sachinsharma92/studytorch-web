import { Button, Dropdown, Tag, Radio, message, Modal, Menu } from "antd";
import get from "lodash/get";
import includes from "lodash/includes";
import { useDispatch } from "react-redux";
import map from "lodash/map";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { optionAlphabet } from "../../../constants/questions";
import { deleteQuestion } from "../../../redux/actions/questionActions";
// Images
import verticalDot from "../../../assets/images/icons/vertical-dot.svg";
import { truncateText } from "../../../utilities/helpers";
import { DELETE_QUESTION_SUCCESS } from "../../../constants/messages";

// Styles
import "./styles.scss";
const { confirm } = Modal;

function QuestionCard(props: any) {
  const {
    question,
    setLoading,
    onSuccess,
    onEditQuestion,
    hideEditDelete,
    collection,
  } = props;
  const answers = get(question, "answers");
  const dispatch = useDispatch();

  const onClickDelete = () => {
    setLoading(true);
    dispatch(deleteQuestion(get(question, "id"), get(collection, "id")))
      .then(() => {
        onSuccess();
        message.success(DELETE_QUESTION_SUCCESS);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onConfirmDelete = () => {
    confirm({
      title: "Do you want to delete this question?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        onClickDelete();
      },
      onCancel() {},
    });
  };

  const menu = (
    <Menu>
      <Menu.Item icon={<EditOutlined />} key="1" onClick={onEditQuestion}>
        Edit
      </Menu.Item>
      <Menu.Item icon={<DeleteOutlined />} key="2" onClick={onConfirmDelete}>
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="question-style">
      <div className="content-sec">
        <div>
          <div className="tag-section">
            <Tag className="tag-style">
              {get(question, "type.value") === 0 ? "Subjective" : "MCQ"}
            </Tag>
          </div>

          <div className="title-section">
            <div className="question-tag">Q</div>
            <h4 className="title4">
              {truncateText(get(question, "title"), 50)}
            </h4>
          </div>
        </div>

        <div className="button-menu">
          {!hideEditDelete && (
            <Dropdown overlayClassName="collection-dropdown" overlay={menu}>
              {/* <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            > */}
              <img src={verticalDot} />
              {/* </a> */}
            </Dropdown>
          )}
        </div>
      </div>

      {get(question, "type.value") === 0 ? (
        <div className="description-sec">
          <p className="description">{truncateText(answers[0], 200)}</p>
        </div>
      ) : (
        <div className="list-section">
          <Radio.Group value={[get(question, "answers")]}>
            {map(get(question, "options", []), (option, i) => (
              <Radio.Button
                value={option}
                className={
                  includes(answers, option)
                    ? "ant-radio-button-wrapper-checked "
                    : ""
                }
              >
                <span>{get(optionAlphabet, `${i}`)}.</span> {option}
              </Radio.Button>
            ))}
          </Radio.Group>
        </div>
      )}

      {!hideEditDelete && (
        <div className="button-section">
          <Button
            className="btn-outline-primary circle"
            onClick={onEditQuestion}
            icon={<EditOutlined />}
          />
          <Button
            className="btn-outline-primary circle"
            onClick={onConfirmDelete}
            icon={<DeleteOutlined />}
          />
        </div>
      )}
    </div>
  );
}

export default QuestionCard;
