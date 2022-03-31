import { Col, Divider, Row, DatePicker } from 'antd';
import get from 'lodash/get';
import { useState } from 'react';
import moment from 'moment';

import DashboardMetrices from '../dashboard/dashboardMetrices';
import StudyPatternGraph from '../dashboard/studyPatternGraph';
import QuizPatternGraph from '../dashboard/quizPatternGraph';
import CollectionDashboardSection from '../../components/dashboard/abc';
import '../../pages/homepage/styles.scss';

const { RangePicker } = DatePicker;

const UserProgress = (props: any) => {
  const { user, isDashboard } = props;
  const [dateRange, setDateRange] = useState([
    moment().startOf('month'),
    moment(),
  ]);
  return (
    <div className="homepage-style">
      <Row>
        <Col sm={isDashboard ? 18 : 24}>
          <div className="section-main">
            <div className="name-section">
              <h3 className="title3 space-md">
                {isDashboard ? 'Welcome ,' : ''} {get(user, 'name')}
              </h3>
              <RangePicker
                className="ranger-picker"
                size="small"
                allowClear={false}
                value={dateRange}
                onChange={(val) => {
                  setDateRange(val);
                }}
                format={'DD-MM-YYYY'}
              />
            </div>
            <Divider />
            <DashboardMetrices user={user} dateRange={dateRange} />

            <StudyPatternGraph user={user} dateRange={dateRange} />

            <QuizPatternGraph user={user} dateRange={dateRange} />
          </div>
        </Col>
        <Col sm={isDashboard ? 6 : 0}>
          {isDashboard && <CollectionDashboardSection />}
        </Col>
      </Row>
    </div>
  );
};

export default UserProgress;
