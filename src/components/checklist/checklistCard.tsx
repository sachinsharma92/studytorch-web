import { Dropdown, Menu, Input, Checkbox, Row, Col } from 'antd';
import { useState } from 'react';
import {
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import map from 'lodash/map';
import filter from 'lodash/filter';
import get from 'lodash/get';

import verticalDot from '../../assets/images/icons/vertical-dot.svg';

// Styles
import './styles.scss';

const { Search } = Input;

function ChecklistCard(props: any) {
  const {
    checklist,
    onConfirmDelete,
    onEditChecklist,
    addTaskToCheckList,
    updateTask,
    onArchiveChecklist,
  } = props;
  function onChange(e: any) {
    const payload = {
      is_completed: e.target.checked,
    };
    updateTask(get(checklist, 'id'), e.target.value, payload);
  }

  const onArchive = (id: any) => {
    updateTask(get(checklist, 'id'), id, {
      is_archived: true,
    });
  };

  const [task, setTask] = useState('');
  const menuData = (
    <Menu>
      <Menu.Item
        icon={<EditOutlined />}
        onClick={() => {
          onEditChecklist(checklist);
        }}
      >
        Rename
      </Menu.Item>
      <Menu.Item
        icon={<DeleteOutlined />}
        onClick={() => onConfirmDelete(get(checklist, 'id'))}
      >
        Delete
      </Menu.Item>
      <Menu.Item
        icon={<InfoCircleOutlined />}
        onClick={() => {
          onArchiveChecklist(get(checklist, 'id'));
        }}
      >
        Archive checked items
      </Menu.Item>
    </Menu>
  );

  const taskMenu = (id: any) => (
    <Menu>
      <Menu.Item
        icon={<EditOutlined />}
        onClick={() => {
          onArchive(id);
        }}
      >
        Archive
      </Menu.Item>
    </Menu>
  );

  const completedTask = filter(get(checklist, 'tasks', []), [
    'is_completed',
    true,
  ]);

  const addTask = () => {
    addTaskToCheckList(get(checklist, 'id'), { description: task });
    setTask('');
  };

  return (
    <div className="checklist-card-style" onClick={props.onClick}>
      <div className="card-style">
        <div className="header">
          <h4 className="title4">
            {get(checklist, 'title')}
            <span>
              ({completedTask.length}/{get(checklist, 'tasks', []).length})
            </span>
          </h4>

          <Dropdown overlayClassName="collection-dropdown" overlay={menuData}>
            <img src={verticalDot} className="icon-style" alt="" />
          </Dropdown>
        </div>

        <div className="list-section">
          <Checkbox.Group
            style={{ width: '100%' }}
            // onChange={onChange}
            value={map(completedTask, 'id')}
          >
            <Row>
              {map(get(checklist, 'tasks', []), (task) => {
                return (
                  <Col span={24}>
                    <div className="checkbox-item">
                      <Checkbox value={get(task, 'id')} onChange={onChange}>
                        {get(task, 'description')}
                      </Checkbox>

                      {get(task, 'is_completed') && (
                        <Dropdown
                          overlayClassName="collection-dropdown"
                          overlay={taskMenu(get(task, 'id'))}
                        >
                          <img
                            src={verticalDot}
                            className="icon-style"
                            alt=""
                          />
                        </Dropdown>
                      )}
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Checkbox.Group>
        </div>

        <div className="input-section">
          <Search
            placeholder="Add to Checklist"
            enterButton="+"
            value={task}
            onSearch={addTask}
            onChange={(e) => {
              setTask(e.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ChecklistCard;
