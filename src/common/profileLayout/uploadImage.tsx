import ImgCrop from 'antd-img-crop';
import { Upload } from 'antd';
import defaultIcon from "../../assets/images/icons/user-profile.svg"
import editCircle from "../../assets/images/icons/edit-circle.svg"


const UploadImage = () => {

  return (
    <div className="image-upload-card">
      <ImgCrop>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          showUploadList={false}
        >
          <img src={defaultIcon}/>
        </Upload>
      </ImgCrop>
      <button className="btn-edit"><img src={editCircle}/></button>

    </div>
  );
};

export default UploadImage;
