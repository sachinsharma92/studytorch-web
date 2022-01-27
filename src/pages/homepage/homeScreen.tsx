import { useSelector } from 'react-redux';
import { Card, Col, Row } from 'antd';
import get from 'lodash/get';
import PieChart from '../../components/charts/pieHighchartChart';
import ColumnHighchartChart from '../../components/charts/columnHighchartChart';
import ScoreHighchartChart from '../../components/charts/scoreHighchartChart';
import FolderIconSVG from '../../common/FolderIconSVG';
import ROUTES from '../../router';
import { Link } from 'react-router-dom';
import PrimaryLayout from '../../common/primaryLayout/primaryLayout';

import arrowIcon1 from '../../assets/images/icons/arrow-down1.svg';
import arrowIcon2 from '../../assets/images/icons/arrow-down2.svg';
import requireAuth from '../../hocs/requireAuth';

// Styles
import './styles.scss';

const collectionList = [
  {
    folderColor: '#6FBEF6',
    title: 'Maths',
    notes: '20',
    quizzes: '2',
  },
  {
    folderColor: '#6253CC',
    title: 'Maths',
    notes: '20',
    quizzes: '2',
    folderType: 'folderUser',
  },
  {
    folderColor: '#6253CC',
    title: 'Maths',
    notes: '20',
    quizzes: '2',
    folderType: 'folderUser',
  },
  {
    folderColor: '#6253CC',
    title: 'Maths',
    notes: '20',
    quizzes: '2',
    folderType: 'folderUser',
  },
  {
    folderColor: '#6253CC',
    title: 'Maths',
    notes: '20',
    quizzes: '2',
    folderType: 'folderUser',
  },
];

function HomeScreen() {
  const user = useSelector((state) => get(state, 'userState.user'));

  return (
    <PrimaryLayout>
      <div className="homepage-style">
        <Row>
          <Col sm={18}>
            <div className="section-main">
              <h3 className="title3 space-md">
                Welcome , {get(user, 'first_name')}
              </h3>

              <Row gutter={24}>
                <Col xs={12} sm={6}>
                  <div className="card-outline">
                    <div className="gray-box"></div>
                    <h3 className="title-md">80%</h3>
                    <h4 className="description">% Score</h4>
                  </div>
                </Col>

                <Col xs={12} sm={6}>
                  <div className="card-outline">
                    <div className="gray-box"></div>
                    <h3 className="title-md">12.5 Hrs</h3>
                    <h4 className="description">Hours Studied</h4>
                  </div>
                </Col>

                <Col xs={12} sm={6}>
                  <div className="card-outline">
                    <div className="gray-box"></div>
                    <h3 className="title-md">45</h3>
                    <h4 className="description">Notes</h4>
                  </div>
                </Col>

                <Col xs={12} sm={6}>
                  <div className="card-outline">
                    <div className="gray-box"></div>
                    <h3 className="title-md">20</h3>
                    <h4 className="description">Collections</h4>
                  </div>
                </Col>

                <Col xs={12} sm={6}>
                  <div className="card-outline">
                    <div className="gray-box"></div>
                    <h3 className="title-md">2</h3>
                    <h4 className="description">Active Quizes</h4>
                  </div>
                </Col>

                <Col xs={12} sm={6}>
                  <div className="card-outline">
                    <div className="gray-box"></div>
                    <h3 className="title-md">5</h3>
                    <h4 className="description">Study Groups</h4>
                  </div>
                </Col>

                <Col xs={24} sm={12}>
                  <div className="card-outline pie-graph-card flex-style">
                    <div className="content-sec">
                      <h3 className="title-md">80%</h3>
                      <h4 className="description">Quizes Success Rate</h4>

                      <div className="flex-style space-md-top">
                        <div>
                          <h4 className="title4">
                            <span className="dot-unsuccessful" /> 1
                          </h4>
                          <p className="description">Unsuccessful</p>
                        </div>
                        <div>
                          <h4 className="title4">
                            <span className="dot-Successful" /> 150
                          </h4>
                          <p className="description">Successful</p>
                        </div>
                      </div>
                    </div>

                    <PieChart />
                  </div>
                </Col>
              </Row>

              <section className="study-section">
                <h3 className="title3">Study Pattern</h3>
                <div className="arrow-icon">
                  <p className="description">01 - 21 March, 2021</p>
                  <img src={arrowIcon1} alt="" />
                </div>
                <ColumnHighchartChart />
              </section>

              <section className="quiz-section">
                <h3 className="title3">Quiz Score Analysis</h3>
                <div className="arrow-icon">
                  <p className="description">01 - 21 March, 2021</p>
                  <img src={arrowIcon2} alt="" />
                </div>

                <Card className="score-chart-card">
                  <ScoreHighchartChart />
                </Card>
              </section>
            </div>
          </Col>
          <Col sm={6}>
            <div className="right-section">
              <h4 className="title4">Most Studied Collections</h4>

              {collectionList.map((data, index) => (
                <Link
                  className="collection-card"
                  key={index}
                  to={ROUTES.COLLECTION_DETAILS_SCREEN}
                >
                  <div className="icon-folder">
                    <FolderIconSVG
                      withUserStyle={data.folderType === 'folderUser' && true}
                      fillColor={data.folderColor}
                    />
                  </div>
                  <div className="content-sec">
                    <h4 className="title4">{data.title}</h4>
                    <p className="description">
                      {data.notes} notes, {data.quizzes} quizzes
                    </p>
                  </div>
                </Link>
              ))}

              <h4 className="title4 mt-3">Recent Studied Collections</h4>

              {collectionList.map((data, index) => (
                <Link
                  className="collection-card"
                  key={index}
                  to={ROUTES.COLLECTION_DETAILS_SCREEN}
                >
                  <div className="icon-folder">
                    <FolderIconSVG fillColor={data.folderColor} />
                  </div>
                  <div className="content-sec">
                    <h4 className="title4">{data.title}</h4>
                    <p className="description">
                      {data.notes} notes, {data.quizzes} quizzes
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Col>
        </Row>
      </div>
    </PrimaryLayout>
  );
}

export default requireAuth(HomeScreen);
