import { Form, Input, Button, Spin, message, Select } from "antd";
import get from "lodash/get";
import map from "lodash/map";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserProfile,
  fetchTimeZones,
} from "../../redux/actions/userActions";
import ProfileLayout from "../../common/profileLayout/profileLayout";
import UploadImage from "../../common/profileLayout/uploadProfileImage";
import { PROFILE_UPDATE_SUCCESS } from "../../constants/messages";
import { checkValidMobileNumber } from "../../utilities/helpers";

// Styles
import "./styles.scss";
import { useEffect, useState } from "react";

const { Option } = Select;

function ProfileScreen(props: any) {
  const user = useSelector((state) => get(state, "userState.user"));
  const [loading, setLoading] = useState(false);
  const [timeZones, setTimeZones] = useState([]);

  const [profileImage, setProfileImage] = useState(
    get(user, "image")
      ? {
          key: get(user, "image"),
          url: get(user, "image_url"),
        }
      : { key: null, url: null }
  );

  const dispatch = useDispatch();

  const getTimeZones = () => {
    setLoading(true);
    dispatch(fetchTimeZones())
      .then((result: any) => {
        setTimeZones(result);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onFinish = (values: any) => {
    setLoading(true);
    dispatch(updateUserProfile({ ...values, image: get(profileImage, "key") }))
      .then(() => {
        setLoading(false);
        message.success(PROFILE_UPDATE_SUCCESS);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const onFinishFailed = (errorInfo: any) => {};

  const onUploadDone = (urlObj: any) => {
    setProfileImage(urlObj);
  };

  useEffect(() => {
    getTimeZones();
  }, []);

  return (
    <ProfileLayout className="profile-page-style">
      <Spin spinning={loading}>
        <h2 className="title2">Account</h2>

        <div className="title-sm">My Profile</div>

        <div className="profile-image-upload">
          <UploadImage
            onUploadDone={onUploadDone}
            setLoading={setLoading}
            imageUrl={get(profileImage, "url")}
          />

          <div className="info-sec">
            <h3 className="title3">{get(user, "name")}</h3>
            <div className="description">{get(user, "email")}</div>
          </div>
        </div>

        <div className="form-section">
          <Form
            name="basic"
            initialValues={{
              name: get(user, "name"),
              username: get(user, "name"),
              phone: get(user, "phone"),
              email: get(user, "email"),
              time_zone: get(user, "time_zone"),
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: "Please enter username!" }]}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              label="Your name"
              name="name"
              rules={[{ required: true, message: "Please enter name!" }]}
            >
              <Input placeholder="Your name" />
            </Form.Item>

            <Form.Item
              label="E-mail"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                {
                  type: "email",
                  message: "Please input valid email format!",
                },
              ]}
            >
              <Input placeholder="Type your e-mail " />
            </Form.Item>
            {/* // "", */}
            <Form.Item
              label="User Time Zone"
              name="time_zone"
              rules={[
                { required: true, message: "Please input your time zone!" },
              ]}
            >
              <Select
                showSearch
                size="large"
                placeholder="Select Note"
                filterOption={(input, option) =>
                  (option!.children as unknown as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                {map(timeZones, (tz, i) => {
                  return (
                    <Option key={i} value={get(tz, "id")}>
                      {get(tz, "label")}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                { required: true, message: "Please input your contact!" },
                {
                  validator: checkValidMobileNumber,
                },
              ]}
            >
              <Input placeholder="Type your contact " />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Spin>
    </ProfileLayout>
  );
}

export default ProfileScreen;
