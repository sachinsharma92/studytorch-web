import { Button, message, Space, Spin, notification } from 'antd';
import get from 'lodash/get';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  verifyGroupLink,
  onAcceptGroupLink,
  rejectLink,
} from '../../redux/actions/groupActions';
import ROUTES from '../../router';
import AuthLayout from '../auth/authLayout';
import {
  LINK_ACCEPT_SUCCESS,
  LINK_REJECT_SUCCESS,
} from '../../constants/messages';

// Styles
import '../auth/styles.scss';

/**
 * Props
 */

/**
 *
 * @param props: LoginScreenProps
 * @returns JSX.Element
 */
function GroupInvitationScreen(props: any) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();

  const verifyInvitationLink = () => {
    setLoading(true);
    dispatch(verifyGroupLink(id))
      .then((result: any) => {
        if (!get(result, 'userExists')) {
          navigate(ROUTES.LOGIN_SCREEN, { replace: true });
          notification.error({
            message: 'Please register on study torch',
            description: 'Please register first and then accept link',
          });
          return;
        } else {
          setGroup(result);
          setLoading(false);
        }
      })
      .catch(() => {
        navigate(ROUTES.LOGIN_SCREEN, { replace: true });
        setLoading(false);
      });
  };

  const onVerifyLink = () => {
    setLoading(true);
    dispatch(onAcceptGroupLink(id))
      .then(() => {
        setLoading(false);
        message.success(LINK_ACCEPT_SUCCESS);
        navigate(ROUTES.LOGIN_SCREEN, { replace: true });
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onRejectLink = () => {
    setLoading(true);
    dispatch(rejectLink(id))
      .then(() => {
        setLoading(false);
        message.success(LINK_REJECT_SUCCESS);
        navigate(ROUTES.LOGIN_SCREEN, { replace: true });
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    verifyInvitationLink();
  }, []);

  return (
    <div className="auth-page-style">
      <AuthLayout>
        <Spin spinning={loading}>
          <div className="form-section">
            <div className="content">
              <div className="emoji-style">👋</div>
              <h2 className="title2">Welcome to StudyTorch!</h2>
              <p className="description">
                You got invitation to join {get(group, 'name')} Group
              </p>
              <Space size={'large'}>
                <Button type="primary" onClick={onVerifyLink}>
                  Join
                </Button>
                <Button onClick={onRejectLink}>Reject</Button>
              </Space>
            </div>
          </div>
        </Spin>
      </AuthLayout>
    </div>
  );
}

export default GroupInvitationScreen;
