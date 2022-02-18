import axios from 'axios';
import get from 'lodash/get';
import * as APIS from '../../constants/apis';

export const uploadImage = (file: any, type: any) => () => {
  var bodyFormData = new FormData();

  bodyFormData.append('file', file.file.originFileObj);
  bodyFormData.append('type', type);
  let url = `${APIS.BASE_URL}${APIS.UPLOAD_IMAGE}`;

  return axios({
    method: 'post',
    url: url,
    data: bodyFormData,
    headers: { 'Content-Type': 'multipart/form-data' },
  })
    .then(function (response) {
      return get(response, 'data.data');
    })
    .catch(function (response) {
      throw response;
    });
};

export const unlinkMedia =
  (mediaUuid: any): any =>
  (dispatch: any, getState: any, { api }: any): any => {
    let url = APIS.UNLINK_NOTE_MEDIA.replace(':mediaUuid', mediaUuid);

    return new api.delete(url)
      .then((res: any) => {
        return res;
      })
      .catch((error: any) => {
        throw error;
      });
  };
