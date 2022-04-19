import { Avatar, Col, Row } from "antd";

// Styles
import "./styles.scss";

function ReportDetailCard(props: any) {
  return (
    <div className="report-detail-style">
      <div className="user-head">
        <Avatar
          size="large"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
        />
        <h3 className="title3">Ayush Parashar</h3>
      </div>

      <div className="info-section">
        <Row>
          <Col sm={12}>
            <div className="info-box">
              <h4 className="title4">Member Since</h4>
              <p className="description">08 / 11 / 2021</p>
            </div>
          </Col>
          <Col sm={12}>
            <div className="info-box">
              <h4 className="title4">Quizzes Taken</h4>
              <p className="description">20</p>
            </div>
          </Col>
          <Col sm={12}>
            <div className="info-box">
              <h4 className="title4">Quizzes Skipped</h4>
              <p className="description">2</p>
            </div>
          </Col>
          <Col sm={12}>
            <div className="info-box">
              <h4 className="title4">Assgmnt. Submitted</h4>
              <p className="description">2</p>
            </div>
          </Col>
          <Col sm={12}>
            <div className="info-box">
              <h4 className="title4">Assgmnt. Skipped</h4>
              <p className="description">0</p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ReportDetailCard;
