import axios from 'axios';
import { notification } from 'antd';
import get from 'lodash/get';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  function (config: any) {
    return config;
  },
  function (error: any) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response: any) {
    return get(response, 'data.data');
  },
  function (error: any) {
    if (!get(error, 'response')) {
      notification.error({
        message: 'Something Went wrong',
        description: 'Please try again or contact technical team',
      });
    } else {
      notification.error({
        message: get(error, 'response.data.message'),
      });
    }
    return Promise.reject(error);
  }
);

export default instance;

export function setAccessToken(axiosInstance: any, accessToken: any): void {
  axiosInstance.defaults.headers.common['Authorization'] = accessToken
    ? `Bearer ${accessToken}`
    : null;
}
