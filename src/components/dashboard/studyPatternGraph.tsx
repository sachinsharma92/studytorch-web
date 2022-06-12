import { Spin } from "antd";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import get from "lodash/get";
import map from "lodash/map";
import moment from "moment";
import ColumnHighchartChart from "../charts/columnHighchartChart";
import EmptyState from "../../common/emptyState/emptyState";
import { fetchDashboardPattern } from "../../redux/actions/dashboardActions";
import noDataImage from "../../assets/images/study-not-data.svg";
import { rangeQueryObj } from "../../utilities/helpers";

const StudyPatternGraph = (props: any) => {
  const { user, dateRange } = props;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [data, setData] = useState<any>({
    categories: [],
    values: [],
  });
  const [date] = useState({
    start: moment().startOf("month"),
    end: moment().endOf("month"),
  });

  const getGraphData = (result: any) => {
    const catArr: any[] = [];
    const valArr: any[] = [];

    map(result, (d) => {
      catArr.push(moment(get(d, "date"), "YYYY-MM-DD").format("DD/MM"));
      valArr.push(parseInt(get(d, "time")));
    });

    return {
      categories: catArr,
      values: valArr,
    };
  };

  const getDashboardPattern = () => {
    setLoading(true);
    dispatch(fetchDashboardPattern(get(user, "id"), rangeQueryObj(dateRange)))
      .then((result: any) => {
        setData(getGraphData(result));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getDashboardPattern();
  }, [dateRange]);

  return (
    <Spin spinning={loading}>
      <section className="study-section">
        <h3 className="title3">Study Pattern</h3>
        {/* <div className="arrow-icon">
          <p className="description">{`${get(date, 'start').format(
            'DD'
          )} - ${get(date, 'end').format('DD MMMM, YYYY')}`}</p>
          <img src={arrowIcon1} alt="" />
        </div> */}
        {get(data, "categories", []).length === 0 && (
          <EmptyState
            imgUrl={noDataImage}
            description="No study pattern, for this month"
            title=" "
            imgStyle="empty-image"
          />
        )}
        {get(data, "categories", []).length > 0 && (
          <ColumnHighchartChart
            categories={get(data, "categories")}
            values={get(data, "values")}
          />
        )}
      </section>
    </Spin>
  );
};

export default StudyPatternGraph;
