import { Button, Col, Row, Tooltip, Popconfirm } from 'antd';
import get from 'lodash/get';
import moment from 'moment';
import { DeleteFilled } from '@ant-design/icons';
// Styles
import './styles.scss';

function PlanDetails(props: any) {
  const { plan, onClickEdit, onDeletePlan } = props;

  return (
    <div className="report-detail-style">
      <div className="user-head">
        <h3 className="title3">{get(plan, 'title')}</h3>
      </div>

      <div className="info-section">
        <Row>
          <Col sm={12}>
            <div className="info-box">
              <h4 className="title4">From</h4>
              <p className="description">
                {moment(get(plan, 'start_date'), 'YYYY-MM-DD').format(
                  'DD/MM/YYYY'
                )}
              </p>
            </div>
          </Col>
          <Col sm={12}>
            <div className="info-box">
              <h4 className="title4">To</h4>
              <p className="description">
                {moment(get(plan, 'end_date'), 'YYYY-MM-DD').format(
                  'DD/MM/YYYY'
                )}
              </p>
            </div>
          </Col>
          <Col sm={12}>
            <div className="info-box">
              <h4 className="title4">Time</h4>
              <p className="description">
                {get(plan, 'start_time')}-{get(plan, 'end_time')}
              </p>
            </div>
          </Col>
          <Col xl={24}>
            <div className="info-box">
              <h4 className="title4">Description</h4>
              <p className="description">{get(plan, 'description')}</p>
            </div>
          </Col>
        </Row>
      </div>
      <Row>
        <Col xl={8}>
          <div className="info-box">
            <Button type="primary" onClick={() => onClickEdit(plan)}>
              Edit
            </Button>
          </div>
        </Col>
        <Col xl={8}>
          <div className="info-box">
            <Popconfirm
              title="Are you sure to delete this plan?"
              onConfirm={() => {
                onDeletePlan(get(plan, 'id'));
              }}
              onCancel={() => {}}
              okText="Yes"
              cancelText="No"
            >
              <Tooltip title="Delete Plan">
                <DeleteFilled />
              </Tooltip>
            </Popconfirm>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default PlanDetails;
