import { Upload, Modal, message } from 'antd';
import { useEffect, useState } from 'react';
import get from 'lodash/get';
import map from 'lodash/map';
import remove from 'lodash/remove';
import findIndex from 'lodash/findIndex';
import { useSelector } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import { IMAGE_UPLOAD } from '../../constants/apis';

const QuestionImageUpload = (props: any) => {
  const { edit, setLoading, setImages, images } = props;

  const token = useSelector((state) => get(state, 'userState.accessToken'));
  const [imagePreview, setImagePreview] = useState<any>({
    previewImage: null,
    previewVisible: false,
  });

  const [fileList, setFileList] = useState<any[]>([]);

  useEffect(() => {
    if (edit) {
      setFileList(
        map(images, (qm) => {
          return {
            uid: get(qm, 'key'),
            name: get(qm, 'key'),
            status: 'done',
            url: get(qm, 'url'),
            linked: true,
          };
        })
      );
    }
  }, []);

  const handleImagePreview = (file: any) => {
    let index = findIndex(fileList, ['uid', get(file, 'uid')]);
    setImagePreview({
      previewImage: get(images, `${index}.url`),
      previewVisible: true,
    });
  };

  const handleChange = (info: any) => {
    if (get(info, 'file.status') === 'uploading') {
      setLoading(true);
    } else if (get(info, 'file.status') === 'done') {
      setImages([...images, get(info, 'file.response.data')]);
      setLoading(false);
    }
    if (get(info, 'file.status') === 'removed') {
      let newImages = [...images];
      remove(
        newImages,
        (i, index) =>
          index === findIndex(fileList, ['uid', get(info, 'file.uid')])
      );
      setImages(newImages);
    } else {
      setLoading(false);
    }
    setFileList([...info.fileList]);
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
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        multiple
        action={IMAGE_UPLOAD}
        headers={{ Authorization: `Bearer ${token}` }}
        beforeUpload={beforeUpload}
        onPreview={handleImagePreview}
        onChange={handleChange}
      >
        <div>
          <PlusOutlined />
          <div className="ant-upload-text">Upload</div>
        </div>
      </Upload>
      <Modal
        visible={get(imagePreview, 'previewVisible')}
        footer={null}
        onCancel={() => {
          setImagePreview({
            previewVisible: false,
            previewImage: null,
          });
        }}
      >
        <img
          alt="example"
          style={{ width: '100%' }}
          src={get(imagePreview, 'previewImage')}
        />
      </Modal>
    </>
  );
};

export default QuestionImageUpload;
