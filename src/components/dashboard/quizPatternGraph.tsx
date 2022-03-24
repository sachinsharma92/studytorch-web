import { Card, Spin } from 'antd';
import { useState, useEffect } from 'react';
import get from 'lodash/get';
import map from 'lodash/map';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import ScoreHighchartChart from '../charts/scoreHighchartChart';
import { fetchDashboardQuizPattern } from '../../redux/actions/dashboardActions';
import arrowIcon2 from '../../assets/images/icons/arrow-down2.svg';
import EmptyState from '../../common/emptyState/emptyState';
import noDataImage from '../../assets/images/study-not-data.svg';
import { rangeQueryObj } from '../../utilities/helpers';

const QuizPatternGraph = (props: any) => {
  const { user, dateRange } = props;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [data, setData] = useState<any>({
    categories: [],
    values: [],
  });
  const [date] = useState({
    start: moment().startOf('month'),
    end: moment().endOf('month'),
  });

  const getGraphData = (result: any) => {
    const catArr: any[] = [];
    const valArr: any[] = [];

    map(result, (d) => {
      catArr.push(moment(get(d, 'date'), 'YYYY-MM-DD').format('DD'));
      valArr.push(get(d, 'avg'));
    });

    return {
      categories: catArr,
      values: valArr,
    };
  };

  const getDashboardQuizPattern = () => {
    setLoading(true);
    dispatch(
      fetchDashboardQuizPattern(get(user, 'id'), rangeQueryObj(dateRange))
    )
      .then((result: any) => {
        setData(getGraphData(result));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getDashboardQuizPattern();
  }, [dateRange]);

  return (
    <Spin spinning={loading}>
      <section className="quiz-section">
        <h3 className="title3">Quiz Score Analysis</h3>
        <div className="arrow-icon">
          <p className="description">{`${get(date, 'start').format(
            'DD'
          )} - ${get(date, 'end').format('DD MMMM, YYYY')}`}</p>
          <img src={arrowIcon2} alt="" />
        </div>
        {get(data, 'categories', []).length === 0 && (
          <EmptyState
            imgUrl={noDataImage}
            description="No study pattern, for this month"
            title=" "
            imgStyle="empty-image"
          />
        )}
        {get(data, 'categories', []).length > 0 && (
          <Card className="score-chart-card">
            <ScoreHighchartChart
              categories={get(data, 'categories')}
              values={get(data, 'values')}
            />
          </Card>
        )}
      </section>
    </Spin>
  );
};

export default QuizPatternGraph;
