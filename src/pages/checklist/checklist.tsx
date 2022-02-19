import { useState } from 'react';
import { Button, Col, PageHeader, Row, Menu } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import PrimaryLayout from '../../common/primaryLayout/primaryLayout';
import EmptyState from '../../common/emptyState/emptyState';
import { momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

// Images
import noDataImage from '../../assets/images/study-not-data.svg';

// Styles
import './styles.scss';
import AddChecklist from '../../components/checklist/modals/addChecklist';
import ChecklistCard from '../../components/checklist/checklist';

const localizer = momentLocalizer(moment);

const checklistCardData = [{}, {}, {}];

function ChecklistScreen(props: any) {
  const [isPlannerAddModal, setIsPlannerAddModal] = useState(false);
  const plannerAddToggleModal = () => {
    setIsPlannerAddModal(!isPlannerAddModal);
  };

  return (
    <PrimaryLayout>
      <div className="checklist-page-style">
        <PageHeader
          className="site-page-header header-back"
          title="Study Checklist"
        />

        {props.collectionData ? (
          <div className="state-center">
            <EmptyState
              imgUrl={noDataImage}
              title="Start your study plan"
              buttonText="Add Checklist"
              buttonType="primary"
              imgStyle="empty-image"
              buttonHandler={plannerAddToggleModal}
            />
          </div>
        ) : (
          <div className="checklist-section">
            <Row gutter={22}>
              {checklistCardData.map((data, index) => (
                <Col xs={24} sm={8} key={index}>
                  <ChecklistCard
                    menuData={
                      <Menu>
                        <Menu.Item icon={<EditOutlined />}>
                          <a target="_blank" rel="noopener noreferrer" href="#">
                            Rename
                          </a>
                        </Menu.Item>
                        <Menu.Item icon={<DeleteOutlined />}>
                          <a target="_blank" rel="noopener noreferrer" href="#">
                            Delete
                          </a>
                        </Menu.Item>
                        <Menu.Item icon={<InfoCircleOutlined />}>
                          <a target="_blank" rel="noopener noreferrer" href="#">
                            Archive checked items
                          </a>
                        </Menu.Item>
                      </Menu>
                    }
                  />
                </Col>
              ))}
            </Row>
          </div>
        )}
      </div>

      {/* Questions Modal */}
      <AddChecklist
        visible={isPlannerAddModal}
        addHandler={plannerAddToggleModal}
        cancelHandler={plannerAddToggleModal}
        onCancel={plannerAddToggleModal}
      />

      <Button
        onClick={plannerAddToggleModal}
        className="button-add-circle"
        shape="circle"
        type="primary"
        icon={<PlusOutlined />}
      />
    </PrimaryLayout>
  );
}

export default ChecklistScreen;
