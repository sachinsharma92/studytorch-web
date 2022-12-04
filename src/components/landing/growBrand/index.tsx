import { Avatar, Tooltip } from "antd";
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";

// Styles
import "./styles.scss";
function GrowBrand(props: any) {
  return (
    <div className="grow-brand-section">
      <div className="blue-card">
        <div className="left-sec">
          <h4 className="title-l4">Grow your brand presence on social media</h4>
          <p className="description">Join with more 1200+ happy Student users</p>

          <div className="img-group-sec">
            <Avatar.Group>
              <Avatar src="https://joeschmoe.io/api/v1/random" />
              <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
              <Tooltip title="Ant User" placement="top">
                <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
              </Tooltip>
              <Avatar style={{ backgroundColor: '#1890ff' }} icon={<AntDesignOutlined />} />
            </Avatar.Group>

            <Link to="/">and many more others</Link>
          </div>
        </div>
        <div className="right-sec">
          <Link to="/" className='btn-free'>
            Try for free Now !
          </Link>
        </div>
      </div>
    </div>
  );
}

export default GrowBrand;
