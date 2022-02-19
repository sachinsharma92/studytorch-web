import ImgCrop from 'antd-img-crop';
import { Upload, message } from 'antd';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import defaultIcon from '../../assets/images/icons/user-profile.svg';
import editCircle from '../../assets/images/icons/edit-circle.svg';
import { IMAGE_UPLOAD } from '../../constants/apis';

const UploadProfileImage = (props: any) => {
  const { imageUrl, onUploadDone, setLoading } = props;
  const token = useSelector((state) => get(state, 'userState.accessToken'));

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      get(info, 'file.response');
      setLoading(false);
      onUploadDone(get(info, 'file.response.data'));
    } else {
      setLoading(false);
    }
  };

  function beforeUpload(file: any) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  return (
    <div className="image-upload-card">
      <ImgCrop>
        <Upload
          action={IMAGE_UPLOAD}
          listType="picture-card"
          showUploadList={false}
          headers={{ Authorization: `Bearer ${token}` }}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="" />
          ) : (
            <img src={defaultIcon} alt="" />
          )}
        </Upload>
      </ImgCrop>
      <button className="btn-edit">
        <img src={editCircle} alt="" />
      </button>
    </div>
  );
};

export default UploadProfileImage;
