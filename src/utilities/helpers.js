import { Avatar } from 'antd';
import get from 'lodash/get';
import map from 'lodash/map';
import moment from 'moment';
import upperCase from 'lodash/upperCase';

export const truncateText = (input, length) => {
  if (input.length > length) {
    return `${input.substring(0, length)}...`;
  }
  return input;
};

export const getNameAvatar = (name, size = 30, color = '#f56a00') => (
  <Avatar style={{ backgroundColor: color }}>
    {upperCase(get(name, '0'))}
  </Avatar>
);

export const replaceMultiple = (string, mapObj) => {
  const re = new RegExp(Object.keys(mapObj).join('|'), 'gi');
  string = string.replace(re, (matched) => mapObj[matched]);
  return string;
};

export const getUrl = (apiPath, params = null) => {
  let paramString = '';
  let firstParam = true;
  if (params) {
    paramString += '?';
    map(params, (value, key) => {
      if (firstParam) {
        paramString += `${key}=${value}`;
        firstParam = false;
      } else {
        paramString += `&${key}=${value}`;
      }
    });
  }
  return `${apiPath}${paramString}`;
};

export const getTimeText = (time = 0) => {
  var durationValue = moment.duration(time, 'seconds');
  var hours = Math.floor(durationValue.asHours());
  var mins = Math.floor(durationValue.asMinutes()) - hours * 60;

  if (time < 60) {
    return `${time} Sec`;
  } else if (time < 3600) {
    return `${mins} Min`;
  } else {
    return `${hours}:${mins} Hrs`;
  }
};
