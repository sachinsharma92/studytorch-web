import { Row, Col, Spin, Pagination } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import map from 'lodash/map';
import get from 'lodash/get';
import QuizReportCard from '../../quiz/quizReportCard';
import { fetchGroupReport } from '../../../redux/actions/groupActions';

const GroupReportTab = (props: any) => {
  const { group } = props;
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [report, setReports] = useState(null);

  const getGroupReport = (page = 1) => {
    setLoading(true);
    dispatch(fetchGroupReport(get(group, 'id'), { limit: 6, page }))
      .then((result: any) => {
        setReports(result);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getGroupReport(1);
  }, []);
  console.log('@@@@@@@@report', report);
  return (
    <Spin spinning={loading}>
      <Row gutter={24}>
        <Col xs={12} sm={6}>
          <div className="card-outline">
            <div className="gray-box" />
            <div className="flex">
              <h3 className="title-md">{get(group, 'members', []).length}</h3>
              <p className="description">Group Members</p>
            </div>
          </div>
        </Col>
        <Col xs={12} sm={6}>
          <div className="card-outline">
            <div className="gray-box" />
            <div className="flex">
              <h3 className="title-md">{get(report, 'total_collection')}</h3>
              <p className="description">Total Collections</p>
            </div>
          </div>
        </Col>

        <Col xs={12} sm={6}>
          <div className="card-outline">
            <div className="gray-box" />
            <div className="flex">
              <h3 className="title-md">{get(report, 'total_quizzes')}</h3>
              <p className="description">Total Quizes</p>
            </div>
          </div>
        </Col>

        <Col xs={12} sm={6}>
          <div className="card-outline">
            <div className="gray-box" />
            <div className="flex">
              <h3 className="title-md">12.5 Hrs</h3>
              <p className="description">Group Studied</p>
            </div>
          </div>
        </Col>
      </Row>
      <div className="card-section report-section">
        <h3 className="title3">Quiz Reports</h3>
        <Row gutter={32}>
          {map(get(report, 'data'), (quiz, index) => (
            <Col sm={8} key={index}>
              <QuizReportCard quiz={quiz} group={group} />
            </Col>
          ))}
        </Row>
        <div className="pagination-section">
          <Pagination
            current={get(report, 'meta.pagination.current_page', 1)}
            total={get(report, 'meta.pagination.total', 1)}
            pageSize={get(report, 'meta.pagination.per_page', 1)}
            onChange={(page) => {
              //   onClickPagination(page);
              getGroupReport(page);
            }}
          />
        </div>
      </div>
    </Spin>
  );
};

export default GroupReportTab;
