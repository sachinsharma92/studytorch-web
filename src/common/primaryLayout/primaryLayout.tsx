import { Col, Layout, Menu, Row, Dropdown, Avatar } from 'antd';

import LogoPrimary from '../logoPrimary/logoPrimary';
import SearchPrimary from '../searchPrimary/searchPrimary';


// Icons here
import iconDashboard from "../../assets/images/icons/dashboard.svg"
import iconCollections from "../../assets/images/icons/folder.svg"
import iconShared from "../../assets/images/icons/user.svg"
import iconGroups from "../../assets/images/icons/3user.svg"
import iconPlanner from "../../assets/images/icons/calendar.svg"
import iconChecklist from "../../assets/images/icons/checklist.svg"
import iconQuiz from "../../assets/images/icons/help-circle.svg"


// Styles
import './styles.scss';
import { Link, useLocation } from 'react-router-dom';
import ROUTES from '../../router';
import { useEffect, useState } from 'react';

const menu = (
  <Menu>
    <Menu.Item>
      <a href="https://www.antgroup.com">
        Edit Profile
      </a>
    </Menu.Item>
    <Menu.Item>
      <a href="https://www.aliyun.com">
        Read About
      </a>
    </Menu.Item>
    <Menu.Item danger>Logout</Menu.Item>
  </Menu>
);

const { Header, Content, Sider } = Layout;

export default function PrimaryLayout(props: any) {
  let location = useLocation();
  const [current, setCurrent] = useState(
      location.pathname === "/" || location.pathname === ""
          ? "/dashboard"
          : location.pathname,
  );
  //or simply use const [current, setCurrent] = useState(location.pathname)        

  useEffect(() => {
      if (location) {
          if( current !== location.pathname ) {
              setCurrent(location.pathname);
          }
      }
  }, [location, current]);

  function handleClick(e: any) {
      setCurrent(e.key);
  }

  return (
    <div className={`layout-primary ${props.className}`}>
      <Layout>
        <Layout>
          <Sider width={259} className="sider-style">
            <LogoPrimary logoStyle="logo-style" />

            <Menu
              mode="inline"
              onClick={handleClick}
              selectedKeys={[current]}
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item icon={<img src={iconDashboard} />} key={ROUTES.HOME_SCREEN}><Link to={ROUTES.HOME_SCREEN}>Dashboard</Link></Menu.Item>
              <Menu.Item icon={<img src={iconCollections} />} key={ROUTES.COLLECTION_SCREEN}><Link to={ROUTES.COLLECTION_SCREEN}>Collections</Link></Menu.Item>
              <Menu.Item icon={<img src={iconShared} />} key="3"><Link to={ROUTES.SHARED_SCREEN}>Shared with me</Link></Menu.Item>
              <Menu.Item icon={<img src={iconGroups} />} key={ROUTES.GROUPS_SCREEN}><Link to={ROUTES.GROUPS_SCREEN}>Groups</Link></Menu.Item>
              <Menu.Item icon={<img src={iconPlanner} />} key="5">Planner</Menu.Item>
              <Menu.Item icon={<img src={iconChecklist} />} key="6">Checklist</Menu.Item>
              <Menu.Item icon={<img src={iconQuiz} />} key="7">Quiz</Menu.Item>

            </Menu>
          </Sider>
          <Layout>

            {/* Top Header here */}
            <Header className="header">
              <Row align="middle">
                <Col sm={8}>
                </Col>
                <Col sm={10}>
                  <SearchPrimary />
                </Col>
                <Col sm={6}>
                  <div className="flex-right">
                    <Dropdown overlay={menu}>
                      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        <Avatar size={30} src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZmFjZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60" /> Ayush Parashar
                      </a>
                    </Dropdown>
                  </div>
                </Col>
              </Row>
            </Header>

            {/* Main Content Container here */}
            <Content className="site-layout">
              {props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  )
}
