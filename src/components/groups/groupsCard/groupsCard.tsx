import { Dropdown, Avatar, Tooltip, Menu } from 'antd';
import get from 'lodash/get';
import map from 'lodash/map';
import replace from 'lodash/replace';
import {
  EditOutlined,
  DeleteOutlined,
  UserAddOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import verticalDot from '../../../assets/images/icons/vertical-dot.svg';
import curveImgae from '../../../assets/images/curve-lines.svg';
import { Link } from 'react-router-dom';
import { getNameAvatar } from '../../../utilities/helpers';
import { avatarColors } from '../../../constants/groups';
import { GROUPS_DETAIL_SCREEN } from '../../../router/routes';
import { replaceMultiple } from '../../../utilities/helpers';

// Styles
import './styles.scss';

function GroupsCard(props: any) {
  const { group, onEditGroup, onDelete, onLeaveGroup } = props;
  const redirectUrl = replaceMultiple(GROUPS_DETAIL_SCREEN, {
    ':id': get(group, 'master_collection.id'),
    ':gid': get(group, 'id'),
  });
  const menu = (
    <Menu>
      {get(group, 'is_group_admin') && (
        <Menu.Item
          onClick={() => {
            onEditGroup(group);
          }}
          icon={<EditOutlined />}
        >
          Rename
        </Menu.Item>
      )}
      {get(group, 'is_group_admin') && (
        <Menu.Item
          icon={<DeleteOutlined />}
          onClick={() => onDelete(get(group, 'id'))}
        >
          Delete
        </Menu.Item>
      )}
      {!get(group, 'is_group_admin') && (
        <Menu.Item
          icon={<DeleteOutlined />}
          onClick={() => onLeaveGroup(get(group, 'id'))}
        >
          Leave group
        </Menu.Item>
      )}
      <Menu.Item icon={<InfoCircleOutlined />}>
        <Link to={redirectUrl}>Get Details</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <div
      className="groups-card-style"
      style={{
        backgroundImage: `url(${curveImgae})`,
        backgroundColor: get(group, 'color'),
      }}
    >
      <Link to={redirectUrl}>
        <div className="flex-style">
          <div className="content-sec">
            <h4 className="title4">{get(group, 'name')}</h4>
            <p className="description">{`Created by ${get(
              group,
              'group_admin.name'
            )}, ${get(group, 'group_members', []).length} members`}</p>
          </div>

          <div className="avatar-group">
            <Avatar.Group maxCount={5}>
              {map(get(group, 'group_members', []), (member, i: any) => {
                if (get(member, 'image')) {
                  return (
                    <Tooltip title={get(member, 'username')}>
                      <Avatar src={get(member, 'image_url')} />
                    </Tooltip>
                  );
                }
                return (
                  <Tooltip title={get(member, 'username')}>
                    {getNameAvatar(
                      get(member, 'name'),
                      30,
                      avatarColors[i % 4]
                    )}
                  </Tooltip>
                );
              })}
            </Avatar.Group>
          </div>
        </div>
      </Link>

      <Dropdown overlayClassName="collection-dropdown" overlay={menu}>
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          <img src={verticalDot} className="icon-style" />
        </a>
      </Dropdown>
    </div>
  );
}

export default GroupsCard;
