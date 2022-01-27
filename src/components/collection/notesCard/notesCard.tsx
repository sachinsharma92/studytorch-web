import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import map from 'lodash/map';
import get from 'lodash/get';
import { Dropdown, Tag, Button, Menu, Modal, message } from 'antd';
import { truncateText } from '../../../utilities/helpers';
import verticalDot from '../../../assets/images/icons/vertical-dot.svg';
import { deleteNote } from '../../../redux/actions/noteActions';
import { DELETE_NOTE_SUCCESS } from '../../../constants/messages';

// Styles
import './styles.scss';
const { confirm } = Modal;

function NotesCard(props: any) {
  const { onEditNote, onSuccess, setLoading, id } = props;
  const dispatch = useDispatch();

  const onClickDelete = () => {
    setLoading(true);
    dispatch(deleteNote(id))
      .then(() => {
        onSuccess();
        message.success(DELETE_NOTE_SUCCESS);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onConfirmDelete = () => {
    confirm({
      title: 'Do you Want to delete this note?',
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
      <Menu.Item icon={<EditOutlined />} onClick={onEditNote}>
        Edit
      </Menu.Item>
      <Menu.Item icon={<DeleteOutlined />} onClick={onConfirmDelete}>
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="note-card-style">
      <Dropdown overlayClassName="collection-dropdown" overlay={menu}>
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          <img src={verticalDot} className="icon-style" />
        </a>
      </Dropdown>

      <a className="flex-style">
        <div className="content-sec">
          <h4 className="title4">{props.title}</h4>
          <div className="tag-section">
            {map(get(props, 'tags'), (tag) => (
              <Tag className="tag-style">{get(tag, 'tag')}</Tag>
            ))}
          </div>
          <p className="description">
            {truncateText(
              get(props, 'description', '').replace(/<[^>]+>/g, ''),
              50
            )}
          </p>
        </div>
      </a>

      <div className="button-section">
        <Button
          onClick={onEditNote}
          className="btn-outline-primary circle"
          icon={<EditOutlined />}
        />
        <Button className="btn-outline-primary">Read Note</Button>
      </div>
    </div>
  );
}

export default NotesCard;
