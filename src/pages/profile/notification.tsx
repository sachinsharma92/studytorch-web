import { useState, useEffect } from "react";
import { Row, Col, Spin, Checkbox, Button, message } from "antd";
import get from "lodash/get";
import map from "lodash/map";
import { useSelector, useDispatch } from "react-redux";
import ProfileLayout from "../../common/profileLayout/profileLayout";
import { updateUserNotification } from "../../redux/actions/userActions";
import { NOTIFICATION_UPDATE_SUCCESS } from "../../constants/messages";

// Styles
import "./styles.scss";

function NotificationScreen(props: any) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [checkedValues, setCheckedValues] = useState<any>([]);
  const notificationPermission = useSelector((state) =>
    get(state, "userState.user.notification_permissions")
  );

  useEffect(() => {
    setCheckedValues(map(notificationPermission, (t, key) => key));
  }, [notificationPermission]);

  const onChange = (values: any) => {
    setCheckedValues(values);
  };

  const onSave = () => {
    setLoading(true);
    const paylaod: any = {};
    map(checkedValues, (c): any => {
      paylaod[c] = true;
    });

    setLoading(false);
    dispatch(updateUserNotification({ notification_permissions: paylaod }))
      .then(() => {
        message.success(NOTIFICATION_UPDATE_SUCCESS);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <ProfileLayout className="notification-page-style">
      <Spin spinning={loading}>
        <h2 className="title2">Account</h2>

        <div className="title-sm">Notification</div>

        <div className="choose-section">
          <Row>
            <Col sm={20}>
              <div className="text-sec">
                <h3 className="title3">Email Notification</h3>
                <div className="description">Email me When</div>
              </div>
              <div className="checkbox-style">
                <Checkbox.Group
                  style={{ width: "100%" }}
                  value={checkedValues}
                  onChange={onChange}
                >
                  <Checkbox value="quiz_created">Quiz is created</Checkbox>
                  <Checkbox value="quiz_completed">Quiz is completed</Checkbox>
                  <Checkbox value="shared_collection_edit">
                    Subcollection / note /question added to Shared collection
                  </Checkbox>
                  <Checkbox value="group_email">Group Email</Checkbox>
                </Checkbox.Group>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button onClick={onSave} type="primary" htmlType="submit">
                Save Changes
              </Button>
            </Col>
          </Row>
        </div>
      </Spin>
    </ProfileLayout>
  );
}

export default NotificationScreen;
