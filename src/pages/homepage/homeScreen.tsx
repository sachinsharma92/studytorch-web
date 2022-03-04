import { useSelector } from 'react-redux';
import { Col, Row } from 'antd';
import get from 'lodash/get';
import PrimaryLayout from '../../common/primaryLayout/primaryLayout';

import CollectionDashboardSection from '../../components/dashboard/abc';
import DashboardMetrices from '../../components/dashboard/dashboardMetrices';
import StudyPatternGraph from '../../components/dashboard/studyPatternGraph';
import QuizPatternGraph from '../../components/dashboard/quizPatternGraph';

import requireAuth from '../../hocs/requireAuth';

// Styles
import './styles.scss';

function HomeScreen() {
  const user = useSelector((state) => get(state, 'userState.user'));

  return (
    <PrimaryLayout>
      <div className="homepage-style">
        <Row>
          <Col sm={18}>
            <div className="section-main">
              <h3 className="title3 space-md">Welcome , {get(user, 'name')}</h3>

              <DashboardMetrices />

              <StudyPatternGraph />

              <QuizPatternGraph />
            </div>
          </Col>
          <Col sm={6}>
            <CollectionDashboardSection />
          </Col>
        </Row>
      </div>
    </PrimaryLayout>
  );
}

export default requireAuth(HomeScreen);
