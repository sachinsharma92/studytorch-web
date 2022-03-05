import { Layout, Menu } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

// Styles
import './styles.scss';
import ROUTES from '../../router';

const { Content, Sider } = Layout;

function ProfileLayout(props: any) {
  return (
    <Layout className={`profile-layout-style ${props.className}`}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {}}
        onCollapse={(collapsed, type) => {}}
      >
        <div className="link-custom">
          <Link to="/">
            <LeftOutlined />
            Back
          </Link>
        </div>

        <Menu mode="inline" defaultSelectedKeys={['4']}>
          <Menu.Item key="1">
            <Link to={ROUTES.PROFILE_SCREEN}>My Profile</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to={ROUTES.NOTIFICATION_SCREEN}>Notifications</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to={ROUTES.SECURITY_SCREEN}>Security</Link>
          </Menu.Item>
        </Menu>

        <div className="link-custom delete">
          <Link to={ROUTES.ACCOUNT_DELETE_SCREEN}>Delete Account</Link>
        </div>
      </Sider>
      <Layout>
        <Content>
          <div className="site-layout-background">{props.children}</div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default ProfileLayout;
