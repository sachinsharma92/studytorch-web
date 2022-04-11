import { Link } from "react-router-dom";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  ShareAltOutlined,
  CopyOutlined,
  CloudDownloadOutlined,
} from "@ant-design/icons";
import get from "lodash/get";
import { useDispatch } from "react-redux";
import { Dropdown, Menu, message, Modal } from "antd";
import {
  DELETE_COLLECTION_SUCCESS,
  COLLECTION_DUPLICATE_SUCCESS,
  COLLECTION_ARCHIVE_SUCCESS,
} from "../../../constants/messages";
import {
  deleteCollection,
  duplicateCollection,
  archiveCollection,
} from "../../../redux/actions/collectionActions";
import verticalDot from "../../../assets/images/icons/vertical-dot.svg";
import FolderIconSVG from "../../../common/FolderIconSVG";

// Styles
import "./styles.scss";

const { confirm } = Modal;

function CollectionCard(props: any) {
  const {
    onEditCollection,
    setLoading,
    id,
    onSuccess,
    color,
    withUserStyle,
    parentCollection,
    hideEditDelete,
    toggleShareCollectionModal,
  } = props;
  const dispatch = useDispatch();

  const onClickDelete = () => {
    setLoading(true);
    dispatch(deleteCollection(id, { parent_id: get(parentCollection, "id") }))
      .then(() => {
        onSuccess();
        message.success(DELETE_COLLECTION_SUCCESS);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onConfirmDelete = () => {
    confirm({
      title: "Do you Want to delete this collection?",
      icon: <ExclamationCircleOutlined />,

      onOk() {
        onClickDelete();
      },
      onCancel() {},
    });
  };

  const onClickArchive = () => {
    setLoading(true);
    dispatch(
      archiveCollection(id, {
        parent_id: get(parentCollection, "id"),
        is_archived: true,
      })
    )
      .then(() => {
        onSuccess();
        message.success(COLLECTION_ARCHIVE_SUCCESS);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onConfirmArchive = () => {
    confirm({
      title: "Are you sure, you want to archive this collection?",
      icon: <ExclamationCircleOutlined />,

      onOk() {
        onClickArchive();
      },
      onCancel() {},
    });
  };

  const onCreatDuplicate = () => {
    setLoading(true);
    dispatch(
      duplicateCollection(id, { parent_id: get(parentCollection, "id") })
    )
      .then(() => {
        onSuccess();
        message.success(COLLECTION_DUPLICATE_SUCCESS);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const menu = (
    <Menu>
      <Menu.Item icon={<EditOutlined />} onClick={onEditCollection}>
        Edit
      </Menu.Item>
      <Menu.Item icon={<CopyOutlined />} onClick={() => onCreatDuplicate()}>
        Create Duplicate
      </Menu.Item>

      <Menu.Item
        icon={<CloudDownloadOutlined />}
        onClick={() => onConfirmArchive()}
      >
        Archive Collection
      </Menu.Item>
      <Menu.Item icon={<DeleteOutlined />} onClick={() => onConfirmDelete()}>
        Delete
      </Menu.Item>
      {toggleShareCollectionModal && (
        <Menu.Item
          icon={<ShareAltOutlined />}
          onClick={() => toggleShareCollectionModal()}
        >
          Share to group
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <div className="collection-card-style">
      <Link to={`${props.cardHandler}`}>
        <a className="flex-style">
          {/* <img className="img-style" src={props.imgUrl} alt="" /> */}
          <div className="folder-icon">
            <FolderIconSVG
              fillColor={color}
              withUserStyle={withUserStyle ? true : false}
            />
          </div>
          <div className="content-sec">
            <h4 className="title4">{props.title}</h4>
            <p className="description">{props.description}</p>
          </div>
        </a>
      </Link>

      {!hideEditDelete && (
        <Dropdown overlayClassName="collection-dropdown" overlay={menu}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <img src={verticalDot} className="icon-style" />
          </a>
        </Dropdown>
      )}
    </div>
  );
}

export default CollectionCard;
