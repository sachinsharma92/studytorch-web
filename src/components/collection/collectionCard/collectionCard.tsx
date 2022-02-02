import { Link } from 'react-router-dom';
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import get from 'lodash/get';
import { useDispatch } from 'react-redux';
import { Dropdown, Menu, message, Modal } from 'antd';
import { DELETE_COLLECTION_SUCCESS } from '../../../constants/messages';
import { deleteCollection } from '../../../redux/actions/collectionActions';
import verticalDot from '../../../assets/images/icons/vertical-dot.svg';
import FolderIconSVG from '../../../common/FolderIconSVG';

// Styles
import './styles.scss';

const { confirm } = Modal;

function CollectionCard(props: any) {
  const { onEditCollection, setLoading, id, onSuccess, color, withUserStyle } =
    props;
  const dispatch = useDispatch();

  const onClickDelete = () => {
    setLoading(true);
    dispatch(deleteCollection(id))
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
      title: 'Do you Want to delete this collection?',
      icon: <ExclamationCircleOutlined />,

      onOk() {
        onClickDelete();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const menu = (
    <Menu>
      <Menu.Item icon={<EditOutlined />} onClick={onEditCollection}>
        Edit
      </Menu.Item>
      <Menu.Item icon={<DeleteOutlined />} onClick={() => onConfirmDelete()}>
        Delete
      </Menu.Item>
      {/* <Menu.Item icon={<InfoCircleOutlined />} onClick={() => alert('3')}>
        Get Details
      </Menu.Item>
      <Menu.Item icon={<UserAddOutlined />} onClick={() => alert('4')}>
        Share
      </Menu.Item> */}
    </Menu>
  );

  return (
    <div className="collection-card-style">
      <Link to={props.cardHandler}>
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

      <Dropdown overlayClassName="collection-dropdown" overlay={menu}>
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          <img src={verticalDot} className="icon-style" />
        </a>
      </Dropdown>
    </div>
  );
}

export default CollectionCard;
