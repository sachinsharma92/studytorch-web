import { Button, message, Space, Spin, notification } from 'antd';
import get from 'lodash/get';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { rejectLink } from '../../redux/actions/groupActions';
import {
  verifyCollectionLink,
  onAcceptCollectionLink,
} from '../../redux/actions/collectionActions';
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
function CollectionInvitationScreen(props: any) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [collection, setCollection] = useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();

  const verifyInvitationLink = () => {
    setLoading(true);
    dispatch(verifyCollectionLink(id))
      .then((result: any) => {
        if (!get(result, 'userExists')) {
          navigate(ROUTES.LOGIN_SCREEN, { replace: true });
          notification.error({
            message: 'Please register on study torch',
            description: 'Please register first and then accept link',
          });
          return;
        } else {
          setCollection(result);
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
    dispatch(onAcceptCollectionLink(id))
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
                You got invitation to add <a>{get(collection, 'name')}</a>{' '}
                collection on your shared collection list
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

export default CollectionInvitationScreen;
