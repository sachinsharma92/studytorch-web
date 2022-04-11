import { Row, Col, Spin } from "antd";
import get from "lodash/get";
import { getTimeText } from "../../utilities/helpers";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import PieChart from "../charts/pieHighchartChart";
import { fetchDashboardMetrices } from "../../redux/actions/dashboardActions";
import hrsIcon from "../../assets/images/dashboard/hrs.svg";
import notesIcon from "../../assets/images/dashboard/notes.svg";
import collectionIcon from "../../assets/images/dashboard/collection.svg";
import quizIcon from "../../assets/images/dashboard/quiz.svg";
import groupStudiesIcon from "../../assets/images/dashboard/group-studies.svg";
import { rangeQueryObj } from "../../utilities/helpers";
import {
  GROUPS_SCREEN,
  QUIZ_SCREEN,
  COLLECTION_SCREEN,
} from "../../router/routes";

const DashboardMetrices = (props: any) => {
  const { user, dateRange, noRedirect } = props;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [metrices, setMetrices] = useState(null);
  let navigate = useNavigate();

  const getDashboardMetrices = () => {
    setLoading(true);

    dispatch(fetchDashboardMetrices(get(user, "id"), rangeQueryObj(dateRange)))
      .then((result: any) => {
        setMetrices(result);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getDashboardMetrices();
  }, [dateRange]);

  const onNavigate = (url: any) => {
    if (!noRedirect) {
      navigate(url);
    }
  };

  return (
    <Spin spinning={loading}>
      <Row gutter={24}>
        <Col xs={12} sm={6}>
          <div className="card-outline">
            <div className="image-box gray-box"></div>
            <h3 className="title-md">{get(metrices, "total_score")}%</h3>
            <h4 className="description">% Score</h4>
          </div>
        </Col>

        <Col xs={12} sm={6}>
          <div className="card-outline">
            <div className="image-box">
              <img src={hrsIcon} className="icon" alt="" />
            </div>
            <h3 className="title-md">
              {getTimeText(get(metrices, "total_studied_time"))}
            </h3>
            <h4 className="description">Hours Studied</h4>
          </div>
        </Col>

        <Col xs={12} sm={6}>
          <div className="card-outline">
            <div className="image-box">
              <img src={notesIcon} className="icon" alt="" />
            </div>
            <h3 className="title-md">{get(metrices, "note_count")}</h3>
            <h4 className="description">Notes</h4>
          </div>
        </Col>

        <Col xs={12} sm={6}>
          <div
            className="card-outline"
            onClick={() => {
              onNavigate(COLLECTION_SCREEN);
            }}
          >
            <div className="image-box">
              <img src={collectionIcon} className="icon" alt="" />
            </div>
            <h3 className="title-md">{get(metrices, "collection_count")}</h3>
            <h4 className="description">Collections</h4>
          </div>
        </Col>

        <Col xs={12} sm={6}>
          <div
            className="card-outline"
            onClick={() => {
              onNavigate(QUIZ_SCREEN);
            }}
          >
            <div className="image-box">
              <img src={quizIcon} className="icon" alt="" />
            </div>
            <h3 className="title-md">{get(metrices, "active_quiz_count")}</h3>
            <h4 className="description">Active Quizes</h4>
          </div>
        </Col>

        <Col xs={12} sm={6}>
          <div
            className="card-outline"
            onClick={() => {
              onNavigate(GROUPS_SCREEN);
            }}
          >
            <div className="image-box">
              <img src={groupStudiesIcon} className="icon" alt="" />
            </div>
            <h3 className="title-md">{get(metrices, "group_count")}</h3>

            <h4 className="description">Study Groups</h4>
          </div>
        </Col>

        <Col xs={24} sm={12}>
          <div className="card-outline pie-graph-card flex-style">
            <div className="content-sec">
              <h3 className="title-md">{get(metrices, "total_score")}%</h3>
              <h4 className="description">Quizes Success Rate</h4>

              <div className="flex-style space-md-top">
                <div
                  onClick={() => {
                    onNavigate(`${QUIZ_SCREEN}?key=2`);
                  }}
                >
                  <h4 className="title4">
                    <span className="dot-unsuccessful" />{" "}
                    {get(metrices, "total_quizzes_attempted", 0) -
                      get(metrices, "pass_quiz", 0)}
                  </h4>
                  <p className="description">Unsuccessful</p>
                </div>
                <div>
                  <h4 className="title4">
                    <span className="dot-Successful" />{" "}
                    {get(metrices, "pass_quiz")}
                  </h4>
                  <p className="description">Successful</p>
                </div>
              </div>
            </div>

            <PieChart
              success={get(metrices, "pass_quiz", 0)}
              percentText={get(metrices, "total_score", 0)}
              unSuccess={
                get(metrices, "total_quizzes_attempted", 0) -
                get(metrices, "pass_quiz", 0)
              }
            />
          </div>
        </Col>
      </Row>
    </Spin>
  );
};

export default DashboardMetrices;
