import React, { useEffect, useState } from 'react';
import { Col, Layout, Menu, Row, Dropdown, Avatar } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import ROUTES from '../../router';
import SearchDataModal from '../searchPrimary/searchDataModal';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';

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

const menu = (
  <Menu>
    <Menu.Item>
      <a href="/profile">
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
  const media = window.matchMedia(`(max-width: 767px)`);
  let location = useLocation();
  const [current, setCurrent] = useState(
    location.pathname === "/" || location.pathname === ""
      ? "/dashboard"
      : location.pathname,
  );
  //or simply use const [current, setCurrent] = useState(location.pathname)        

  useEffect(() => {
    if (location) {
      if (current !== location.pathname) {
        setCurrent(location.pathname);
      }
    }
  }, [location, current]);

  function handleClick(e: any) {
    setCurrent(e.key);
  }

  const [isModalSearch, setIsModalSearch] = useState(false);
  const modalSearchToggle = () => {
    setIsModalSearch(!isModalSearch);
  };

  const [isCollapsed, setIsCollapsed] = useState(false);
  const collapseToggle = () => {
    setIsCollapsed(!isCollapsed);
  };


  return (
    <div className={`layout-primary ${props.className}`}>
      <Layout>
        <Layout>
          <Sider className="sider-style" breakpoint="sm" trigger={null} collapsible collapsed={isCollapsed}>
            <LogoPrimary logoPrimary={!isCollapsed ? true : false} logoStyle="logo-style" />

            <Menu
              mode="inline"
              onClick={handleClick}
              selectedKeys={[current]}
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item icon={<img src={iconDashboard} />} key={ROUTES.HOME_SCREEN}><Link to={ROUTES.HOME_SCREEN}>Dashboard</Link></Menu.Item>
              <Menu.Item icon={<img src={iconCollections} />} key={ROUTES.COLLECTION_SCREEN}><Link to={ROUTES.COLLECTION_SCREEN}>Collections</Link></Menu.Item>
              <Menu.Item icon={<img src={iconShared} />} key={ROUTES.SHARED_SCREEN}><Link to={ROUTES.SHARED_SCREEN}>Shared with me</Link></Menu.Item>
              <Menu.Item icon={<img src={iconGroups} />} key={ROUTES.GROUPS_SCREEN}><Link to={ROUTES.GROUPS_SCREEN}>Groups</Link></Menu.Item>
              <Menu.Item icon={<img src={iconPlanner} />} key={ROUTES.PLANNER_SCREEN}><Link to={ROUTES.PLANNER_SCREEN}>Planner</Link></Menu.Item>
              <Menu.Item icon={<img src={iconChecklist} />} key={ROUTES.CHECKLIST_SCREEN}><Link to={ROUTES.CHECKLIST_SCREEN}>Checklist</Link></Menu.Item>
              <Menu.Item icon={<img src={iconQuiz} />} key={ROUTES.QUIZ_SCREEN}><Link to={ROUTES.QUIZ_SCREEN}>Quiz</Link></Menu.Item>

            </Menu>
          </Sider>
          <Layout>

            {/* Top Header here */}
            <Header className="header">
              <Row align="middle">
                <Col xs={4} md={8}>
                  {React.createElement(isCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: collapseToggle,
                  })}
                </Col>
                <Col xs={10} md={10}>
                  <SearchPrimary onClick={modalSearchToggle} />
                  <SearchDataModal
                    visible={isModalSearch}
                    handleCancel={modalSearchToggle}
                    handleLeave={modalSearchToggle}
                  />
                </Col>
                <Col xs={10} md={6}>
                  <div className="flex-right">
                    <Dropdown overlay={menu}>
                      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        <Avatar size={30} src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZmFjZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60" /> 
                        <span className='profile-text'>Ayush Parashar</span>
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
