import { Avatar } from "antd";
import get from "lodash/get";
import map from "lodash/map";
import isEmpty from "lodash/isEmpty";
import startsWith from "lodash/startsWith";
import countBy from "lodash/countBy";
import moment from "moment";
import slice from "lodash/slice";
import padStart from "lodash/padStart";
import upperCase from "lodash/upperCase";

export const truncateText = (input, length) => {
  if (input.length > length) {
    return `${input.substring(0, length)}...`;
  }
  return input;
};

export const checkValidMobileNumber = (rule, value, callback) => {
  const errorMessage =
    "Invalid phone number format, Make sure phone number start with Country code Ex +61XXXXX!";

  if (!value || isEmpty(value)) {
    callback();
    return;
  }
  const dashCount = countBy(value)["-"] || 0;

  if (dashCount > 3) {
    callback(errorMessage);
    return;
  }

  const plusCount = countBy(value)["+"] || 0;
  if (plusCount > 1) {
    callback(errorMessage);
    return;
  }

  if (plusCount && !startsWith(value, "+")) {
    callback(errorMessage);
    return;
  }
  callback();
  return;
};

export const getNameAvatar = (name, size = 30, color = "#f56a00") => (
  <Avatar size={size} style={{ backgroundColor: color }}>
    {upperCase(get(name, "0"))}
  </Avatar>
);

export const replaceMultiple = (string, mapObj) => {
  const re = new RegExp(Object.keys(mapObj).join("|"), "gi");
  string = string.replace(re, (matched) => mapObj[matched]);
  return string;
};

export const getUrl = (apiPath, params = null) => {
  let paramString = "";
  let firstParam = true;
  if (params) {
    paramString += "?";
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
  var durationValue = moment.duration(time, "seconds");
  var hours = Math.floor(durationValue.asHours());
  var mins = Math.floor(durationValue.asMinutes()) - hours * 60;
  var sec =
    Math.floor(durationValue.asSeconds()) - (hours * 60 * 60 + mins * 60);

  let text = "";
  if (!time) {
    text = `0 Sec`;
  } else if (time < 60) {
    text = `${time} Sec`;
  } else if (time < 3600) {
    text = `${mins} Min ${sec ? sec + " Sec" : ""}`;
  } else {
    text = `${hours}:${mins} ${sec ? ":" + sec : ""} Hrs`;
  }

  return text;
};

export const getFormattedDateString = (date) => {
  return `${date.getFullYear()}-${
    // @ts-ignore: Unreachable code error
    date.getMonth() + 1
    // @ts-ignore: Unreachable code error
  }-${date.getDate()}`;
};

export const getFormattedTimeString = (date) => {
  return `${padStart(date.getHours(), 2, "0")}:${
    // @ts-ignore: Unreachable code error
    padStart(date.getMinutes(), 2, "0")
    // @ts-ignore: Unreachable code error
  }:${padStart(date.getSeconds(), 2, "0")}`;
};

export const rangeQueryObj = (range: any) => {
  return {
    start_date: range[0].format("YYYY-MM-DD"),
    end_date: range[1].format("YYYY-MM-DD"),
  };
};

export const getPaginatedData = (data = [], page = 1, size = 10) => {
  const start = size * (page - 1);
  const end = start + size;
  return slice(data, start, end);
};
