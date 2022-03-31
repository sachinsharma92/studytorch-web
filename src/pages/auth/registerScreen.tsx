import { Button, Form, Input, Checkbox, Spin } from 'antd';
import { useState } from 'react';

import get from 'lodash/get';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ROUTES from '../../router';
import AuthLayout from './authLayout';
import { register } from '../../redux/actions/userActions';

// Styles
import './styles.scss';

/**
 * Props
 */
interface RegisterScreenProps {}

function RegisterScreen(props: RegisterScreenProps) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => get(state, 'userState.isLoggedIn'));
  const showOnBoarding = useSelector((state) =>
    get(state, 'userState.showOnBoarding')
  );

  const onRegister = (payload: any) => {
    setLoading(true);
    dispatch(register(payload))
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onFinish = (values: any) => {
    onRegister(values);
  };

  if (showOnBoarding && isLoggedIn) {
    return <Navigate to={ROUTES.ONBOARDING_SCREEN} />;
  }

  if (isLoggedIn) {
    return <Navigate to={ROUTES.HOME_SCREEN} />;
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="auth-page-style">
      <AuthLayout>
        <Spin spinning={loading}>
          <div className="form-section">
            <div className="content">
              <h2 className="title2">Create your Account</h2>
              <p className="description">It’s free and easy</p>
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
                label="Full Name "
                name="name"
                rules={[
                  { required: true, message: 'Please input your Full Name!' },
                ]}
              >
                <Input placeholder="Type your full Name" />
              </Form.Item>

              <Form.Item
                label="User Name"
                name="username"
                rules={[
                  { required: true, message: 'Please input your User Name!' },
                ]}
              >
                <Input placeholder="Type your User name" />
              </Form.Item>

              <Form.Item
                label="E-mail"
                name="email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  {
                    type: 'email',
                    message: 'Please input valid email format!',
                  },
                ]}
              >
                <Input placeholder="Type your e-mail " />
              </Form.Item>

              <Form.Item
                label="Phone"
                name="phone"
                rules={[
                  { required: true, message: 'Please input your contact!' },

                  {
                    pattern: new RegExp(/^\+(?:[0-9] ?){6,14}[0-9]$/),
                    message:
                      'Invalid phone number format, Make sure phone number start with Country code Ex +61XXXXX!',
                  },
                ]}
              >
                <Input placeholder="Type your contact " />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: 'Please input your password!' },
                ]}
              >
                <Input.Password placeholder="Type your password" />
              </Form.Item>

              <Form.Item
                label="Confirm Password"
                dependencies={['password']}
                name="confirmPassword"
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
              >
                <Input.Password placeholder="Type your password" />
              </Form.Item>

              <Form.Item
                className="checkbox-style"
                valuePropName="checked"
                name="accept"
                rules={[
                  {
                    validator: (rule, value, callback) => {
                      console.log({ value });
                      if (!value) {
                        callback(
                          'Please accept  the Terms and Conditions, and our Privacy Policy!'
                        );
                        return;
                      }
                      callback();
                    },
                  },
                ]}
              >
                <Checkbox>
                  By creating an account means you agree to the Terms and
                  Conditions, and our Privacy Policy
                </Checkbox>
              </Form.Item>

              <Form.Item>
                <Button className="btn-danger" htmlType="submit">
                  Register
                </Button>
              </Form.Item>

              <Form.Item>
                Have a Account?{' '}
                <Button
                  type="link"
                  href={ROUTES.LOGIN_SCREEN}
                  className="color-primary"
                >
                  Log In Now !
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Spin>
      </AuthLayout>
    </div>
  );
}

export default RegisterScreen;
