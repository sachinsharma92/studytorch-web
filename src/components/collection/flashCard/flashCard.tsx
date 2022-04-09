import { Link } from "react-router-dom";
import { Dropdown, Menu, Modal, message } from "antd";
import get from "lodash/get";
import { useDispatch } from "react-redux";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
// Images
import shareIcon from "../../../assets/images/icons/external-link.svg";
import quickIcon from "../../../assets/images/icons/quick.svg";
import verticalDot from "../../../assets/images/icons/vertical-dot.svg";
import { deleteFlashCard } from "../../../redux/actions/flashCardActions";
// Styles
import "./styles.scss";
import { DELETE_FLASHCARD_SUCCESS } from "../../../constants/messages";

const { confirm } = Modal;

function FlashCard(props: any) {
  const {
    flashCard,
    onEditFlashCard,
    setLoading,
    onSuccess,
    hideEditDelete,
    collection,
  } = props;
  const dispatch = useDispatch();

  const onClickDelete = () => {
    setLoading(true);
    dispatch(deleteFlashCard(get(flashCard, "id"), get(collection, "id")))
      .then(() => {
        onSuccess();
        message.success(DELETE_FLASHCARD_SUCCESS);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onConfirmDelete = () => {
    confirm({
      title: "Do you want to delete this flash card?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        onClickDelete();
      },
      onCancel() {},
    });
  };

  const menu = (
    <Menu>
      <Menu.Item icon={<EditOutlined />}>
        <a
          onClick={() => {
            onEditFlashCard(flashCard);
          }}
        >
          Edit
        </a>
      </Menu.Item>
      <Menu.Item icon={<DeleteOutlined />}>
        <a
          onClick={() => {
            onConfirmDelete();
          }}
        >
          Delete
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="flash-card-style">
      <div className="flex-style">
        <div className="content-sec">
          <div className="title-section">
            <img src={quickIcon} alt="" />
            <h4 className="title4">{get(flashCard, "title")}</h4>
          </div>

          <div className="button-section">
            <Link to="/">
              <img src={shareIcon} alt="" />
            </Link>
            {!hideEditDelete && (
              <Dropdown overlayClassName="collection-dropdown" overlay={menu}>
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  <img src={verticalDot} className="icon-style" />
                </a>
              </Dropdown>
            )}
          </div>
        </div>
        <p className="description">{get(flashCard, "description")}</p>
      </div>
    </div>
  );
}

export default FlashCard;
