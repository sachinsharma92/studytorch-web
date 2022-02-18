import { Upload, message, Button } from 'antd';
import get from 'lodash/get';
import { useDispatch, useSelector } from 'react-redux';
import { EditOutlined } from '@ant-design/icons';
import heroBackground from '../../../assets/images/banner-group.png';
import { updateGroup } from '../../../redux/actions/groupActions';
import { IMAGE_UPLOAD } from '../../../constants/apis';

const GroupBanner = (props: any) => {
  const { setLoading, groupDetails, onSuccessUpload } = props;
  const token = useSelector((state) => get(state, 'userState.accessToken'));
  const dispatch = useDispatch();

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      get(info, 'file.response');

      dispatch(
        updateGroup(get(groupDetails, 'id'), {
          name: get(groupDetails, 'name'),
          color: get(groupDetails, 'color'),
          banner_image: get(info, 'file.response.data.key'),
        })
      )
        .then(() => {
          onSuccessUpload();
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
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
    <div
      className="hero-section"
      style={{
        backgroundImage: `url(${
          get(groupDetails, 'banner_image')
            ? get(groupDetails, 'banner_image_url')
            : heroBackground
        })`,
      }}
    >
      {get(groupDetails, 'is_group_admin') && (
        <Upload
          action={IMAGE_UPLOAD}
          showUploadList={false}
          headers={{ Authorization: `Bearer ${token}` }}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          <Button icon={<EditOutlined />} shape="round" size="middle">
            edit
          </Button>
        </Upload>
      )}
    </div>
  );
};

export default GroupBanner;
