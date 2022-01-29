import { Button, Form, Input, Spin, message, Typography } from 'antd';
import { useState } from 'react';
import get from 'lodash/get';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ROUTES from '../../router';
import AuthLayout from './authLayout';
import {
  forgotPassword,
  verifyforgotPassword,
  updateforgotPassword,
} from '../../redux/actions/userActions';
import {
  VERIFICATION_CODE_SENT_SUCCESS,
  CODE_VERIFY_SUCCESS,
} from '../../constants/messages';

// Styles
import './styles.scss';

const { Text } = Typography;

function ForgotScreen(props: any) {
  const [state, setState] = useState({
    emailSent: true,
    verifyCodeSection: false,
    showChangePasswordSection: false,
    email: null,
    code_id: null,
    passwordChangedSuccessSection: false,
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const onFinish = (values: any) => {
    setLoading(true);
    dispatch(forgotPassword(values))
      .then(() => {
        message.success(VERIFICATION_CODE_SENT_SUCCESS);
        setState({
          ...state,
          emailSent: false,
          verifyCodeSection: true,
          email: get(values, 'email'),
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onVerifyCode = (value: any) => {
    setLoading(true);
    dispatch(
      verifyforgotPassword({
        email: get(state, 'email'),
        code: get(value, 'code'),
      })
    )
      .then((result: any) => {
        message.success(CODE_VERIFY_SUCCESS);

        setState({
          ...state,
          verifyCodeSection: false,
          showChangePasswordSection: true,
          code_id: get(result, 'code_id'),
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onChangePassword = (values: any) => {
    setLoading(true);
    dispatch(
      updateforgotPassword({ ...values, code_id: get(state, 'code_id') })
    )
      .then((result: any) => {
        message.success(CODE_VERIFY_SUCCESS);

        setState({
          ...state,
          verifyCodeSection: false,
          showChangePasswordSection: false,
          passwordChangedSuccessSection: true,
        });
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div className="auth-page-style">
      <AuthLayout>
        <Spin spinning={loading}>
          {get(state, 'emailSent') && (
            <div className="form-section">
              <div className="content">
                <div className="emoji-style">🔐</div>
                <h2 className="title2">Password Reset</h2>
                <p className="description">
                  Enter your email and we will send you a verify code
                </p>
              </div>

              {/* <img src={logo} /> */}
              <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
              >
                <Form.Item
                  label="Registered Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your registerd email!',
                    },
                    {
                      type: 'email',
                      message: 'Please input valid email format!',
                    },
                  ]}
                >
                  <Input placeholder="Type your registerd email" />
                </Form.Item>

                <Form.Item>
                  <Button className="btn-danger" htmlType="submit">
                    Reset Password
                  </Button>
                </Form.Item>
              </Form>
            </div>
          )}

          {get(state, 'verifyCodeSection') && (
            <div className="content">
              <div className="emoji-style">🔐</div>
              <h2 className="title1">Email Sent</h2>
              <p className="description">
                An Email has been sent to{' '}
                <Link to="">{get(state, 'email')}</Link>
              </p>
              <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onVerifyCode}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
              >
                <Form.Item
                  label="Verification Code"
                  name="code"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your verification code!',
                    },
                    {
                      min: 4,
                      message: 'Verification code is of minimum 4 character!',
                    },
                  ]}
                >
                  <Input placeholder="Type your verification code" />
                </Form.Item>
                <Form.Item className="text-right">
                  <Button
                    type="link"
                    onClick={() => {
                      onFinish({
                        email: get(state, 'email'),
                      });
                    }}
                    className="color-primary"
                  >
                    Resend Code?
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button className="btn-danger" htmlType="submit">
                    Verify Code
                  </Button>
                </Form.Item>
              </Form>
            </div>
          )}

          {get(state, 'showChangePasswordSection') && (
            <div className="content">
              <div className="emoji-style">🔐</div>
              <h2 className="title1">Enter New Password</h2>

              <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onChangePassword}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
              >
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password placeholder="Type your password " />
                </Form.Item>
                <Form.Item
                  name="confirm_password"
                  label="Confirm Password"
                  dependencies={['password']}
                  rules={[
                    {
                      required: true,
                      message: 'Please input your confirm password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            'The two passwords that you entered do not match!'
                          )
                        );
                      },
                    }),
                  ]}
                  hasFeedback
                >
                  <Input.Password placeholder="Type your confirm password " />
                </Form.Item>

                <Form.Item>
                  <Button className="btn-danger" htmlType="submit">
                    Change password
                  </Button>
                </Form.Item>
              </Form>
            </div>
          )}

          {get(state, 'passwordChangedSuccessSection') && (
            <div className="content">
              <div className="emoji-style">🔐</div>
              <h2 className="title1">Password Changed Successfully</h2>
              <p className="description">
                Click here to go to <Link to="/login">login page</Link>{' '}
              </p>
            </div>
          )}
        </Spin>
      </AuthLayout>
    </div>
  );
}

export default ForgotScreen;
