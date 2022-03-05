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
  var sec =
    Math.floor(durationValue.asSeconds()) - (hours * 60 * 60 + mins * 60);

  let text = '';
  if (time < 60) {
    text = `${time} Sec`;
  } else if (time < 3600) {
    text = `${mins} Min ${sec ? sec + ' Sec' : ''}`;
  } else {
    text = `${hours}:${mins} ${sec ? ':' + sec : ''} Hrs`;
  }

  return text;
};
