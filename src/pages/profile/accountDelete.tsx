import { Row, Col, Button, Spin } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ModalConfirmation from '../../common/modalConfirmation';
import { deleteUser } from '../../redux/actions/userActions';
import ProfileLayout from '../../common/profileLayout/profileLayout';
import { LOGOUT_SCREEN } from '../../router/routes';

// Styles
import './styles.scss';

function AccountDeleteScreen(props: any) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onDelete = () => {
    setLoading(true);
    dispatch(deleteUser())
      .then(() => {
        setLoading(false);
        navigate(LOGOUT_SCREEN);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const [isModalConfirmation, setIsModalConfirmation] = useState(false);
  const modalConfirmationToggle = () => {
    setIsModalConfirmation(!isModalConfirmation);
  };

  return (
    <ProfileLayout className="delete-account-style">
      <Spin spinning={loading}>
        <h2 className="title2">Account</h2>

        <div className="title-sm">Delete Account</div>

        <div className="alert alert-danger">
          Be careful with this action. It is irreversible.
        </div>

        <div className="edit-section">
          <Row>
            <Col sm={20}>
              <h4 className="title4">This will delete your Account</h4>
              <p className="description">
                You will begin the process of deleting your account. You can
                recover your account if it was accidentally or wrongfully
                deleted
              </p>
            </Col>
            <Col sm={4}>
              <Button type="link" onClick={modalConfirmationToggle}>
                Delete This Account
              </Button>
            </Col>
          </Row>
        </div>
      </Spin>
      <ModalConfirmation
        visible={isModalConfirmation}
        handleCancel={modalConfirmationToggle}
        handleLeave={() => {
          onDelete();
        }}
        cancelTitle="Cancel"
        confirmTitle="Yes. Delete"
      >
        <div className="confirmation-section delete-modal-section">
          <h2>Are you sure you want to your StudyPlanner Account?</h2>
          <p className="description">
            You will begin the process of deleting your account. You can recover
            your account if it was accidentally or wrongfully deleted.
          </p>
        </div>
      </ModalConfirmation>
    </ProfileLayout>
  );
}

export default AccountDeleteScreen;
