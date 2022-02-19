import { Menu, message, Dropdown } from 'antd';
import { useState } from 'react';
import { DeleteOutlined, LoginOutlined } from '@ant-design/icons';
import get from 'lodash/get';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Users3 from '../../../assets/images/icons/3-user.svg';
import arrowDown from '../../../assets/images/icons/arrow-down.svg';
import ModalConfirmation from '../../../common/modalConfirmation';
import { deleteGroup, leaveGroup } from '../../../redux/actions/groupActions';
import {
  DELETE_GROUP_SUCCESS,
  LEAVE_GROUP_SUCCESS,
} from '../../../constants/messages';
import { GROUPS_SCREEN } from '../../../router/routes';

const JoinedDropDown = ({ groupDetails, setLoading }) => {
  let navigate = useNavigate();
  const [isModalDelete, setIsModalDelete] = useState(false);
  const dispatch = useDispatch();
  const [isModalConfirmation, setIsModalConfirmation] = useState(false);

  const modalDeleteToggle = () => {
    setIsModalDelete(!isModalDelete);
  };

  const modalConfirmationToggle = () => {
    setIsModalConfirmation(!isModalConfirmation);
  };

  const onDeleteGroup = () => {
    setLoading(true);
    dispatch(deleteGroup(get(groupDetails, 'id')))
      .then(() => {
        modalDeleteToggle();
        message.success(DELETE_GROUP_SUCCESS);
        navigate(GROUPS_SCREEN, { replace: true });
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onLeaveGroup = () => {
    setLoading(true);
    dispatch(leaveGroup(get(groupDetails, 'id')))
      .then(() => {
        modalDeleteToggle();
        message.success(LEAVE_GROUP_SUCCESS);
        navigate(GROUPS_SCREEN, { replace: true });
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const menu = (
    <Menu>
      {get(groupDetails, 'is_group_admin') && (
        <Menu.Item icon={<DeleteOutlined />}>
          <a onClick={modalDeleteToggle}>Delete Group</a>
        </Menu.Item>
      )}
      {!get(groupDetails, 'is_group_admin') && (
        <Menu.Item icon={<LoginOutlined />}>
          <a onClick={modalConfirmationToggle}>Leave Group</a>
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <>
      <Dropdown
        placement="bottomRight"
        overlayClassName="collection-dropdown"
        overlay={menu}
      >
        <a
          className="ant-dropdown-link btn-outline-primary"
          onClick={(e) => e.preventDefault()}
        >
          <img src={Users3} className="icon-style" />
          <span> Joined</span>
          <img src={arrowDown} className="icon-style" />
        </a>
      </Dropdown>

      <ModalConfirmation
        visible={isModalDelete}
        handleCancel={modalDeleteToggle}
        handleLeave={onDeleteGroup}
        wrapClassName="delete-modal-style"
        cancelTitle="Cancel"
        confirmTitle="Yes. Delete"
      >
        <div className="confirmation-section">
          <h2>Are you sure you want to delete this Group!</h2>
        </div>
      </ModalConfirmation>

      <ModalConfirmation
        visible={isModalConfirmation}
        handleCancel={modalConfirmationToggle}
        handleLeave={onLeaveGroup}
        cancelTitle="Cancel"
        confirmTitle="Yes. Leave"
      >
        <div className="confirmation-section">
          <h2>Are you sure you want to leave the</h2>
          <h2 className="theme-color">
            {get(groupDetails, 'name')} Group <span>?</span>
          </h2>
        </div>
      </ModalConfirmation>
    </>
  );
};

export default JoinedDropDown;
