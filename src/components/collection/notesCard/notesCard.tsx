import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import replace from 'lodash/replace';
import map from 'lodash/map';
import get from 'lodash/get';
import { Dropdown, Tag, Button, Menu, Modal, message } from 'antd';
import { truncateText } from '../../../utilities/helpers';
import verticalDot from '../../../assets/images/icons/vertical-dot.svg';
import { deleteNote } from '../../../redux/actions/noteActions';
import { DELETE_NOTE_SUCCESS } from '../../../constants/messages';
import { READ_NOTE_SCREEN } from '../../../router/routes';

// Styles
import './styles.scss';
const { confirm } = Modal;

function NotesCard(props: any) {
  let navigate = useNavigate();
  const { onEditNote, onSuccess, setLoading, id, hideEditDelete, collection } =
    props;
  const dispatch = useDispatch();

  const onClickDelete = () => {
    setLoading(true);
    dispatch(deleteNote(id, get(collection, 'id')))
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

  const t = EditorState.createWithContent(
    convertFromRaw(get(props, 'description'))
  );

  const menu = (
    <Menu>
      <Menu.Item icon={<EditOutlined />} key={'1'} onClick={onEditNote}>
        Edit
      </Menu.Item>
      <Menu.Item icon={<DeleteOutlined />} key={'2'} onClick={onConfirmDelete}>
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="note-card-style">
      {!hideEditDelete && (
        <Dropdown overlayClassName="collection-dropdown" overlay={menu}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            <img src={verticalDot} className="icon-style" />
          </a>
        </Dropdown>
      )}

      <a className="flex-style">
        <div className="content-sec">
          <h4 className="title4">{props.title}</h4>
          <div className="tag-section">
            {map(get(props, 'tags'), (tag, i) => (
              <Tag className="tag-style" key={i}>
                {tag}
              </Tag>
            ))}
          </div>
          <p className="description">
            {truncateText(
              draftToHtml(convertToRaw(t.getCurrentContent())).replace(
                /<[^>]+>/g,
                ''
              ),
              50
            )}
          </p>
        </div>
      </a>

      <div className="button-section">
        {!hideEditDelete && (
          <Button
            onClick={onEditNote}
            className="btn-outline-primary circle"
            icon={<EditOutlined />}
          />
        )}
        <Button
          onClick={() => {
            navigate(replace(READ_NOTE_SCREEN, ':id', id));
          }}
          className="btn-outline-primary"
        >
          Read Note
        </Button>
      </div>
    </div>
  );
}

export default NotesCard;
