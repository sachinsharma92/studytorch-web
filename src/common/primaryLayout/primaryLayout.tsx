import React, { useEffect, useState } from 'react';
import { Col, Layout, Menu, Row, Dropdown, Avatar, Drawer } from 'antd';
import { useLocation } from 'react-router-dom';
import SearchDataModal from '../searchPrimary/searchDataModal';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  CloseOutlined
} from '@ant-design/icons';

import LogoPrimary from '../logoPrimary/logoPrimary';
import SearchPrimary from '../searchPrimary/searchPrimary';


// Styles
import './styles.scss';
import MenuLinks from './menuLinks';

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

  const [isDrawerMobile, setIsDrawerMobile] = useState(false);
  const mobileShowDrawer = () => {
    setIsDrawerMobile(!isDrawerMobile);
  };

  return (
    <div className={`layout-primary ${props.className}`}>
      <Layout>
        <Layout>
          {!media.matches ?
            <Sider className="sider-style" trigger={null} collapsible collapsed={isCollapsed}>
              <LogoPrimary logoPrimary={!isCollapsed ? true : false} logoStyle="logo-style" />
              <MenuLinks
                mode="inline"
                onClick={handleClick}
                selectedKeys={[current]}
              />
            </Sider>

            :
            <Drawer className="drawer-sider-style" placement="left" visible={isDrawerMobile}>
              <div className='drawer-header-style'>
                <LogoPrimary logoPrimary logoStyle="logo-style" />
                <button className='drawer-close-button' onClick={mobileShowDrawer}> <CloseOutlined /></button>
              </div>
              <MenuLinks
                mode="inline"
                onClick={handleClick}
                selectedKeys={[current]}
              />
            </Drawer>
          }
          <Layout>

            {/* Top Header here */}
            <Header className="header">
              <Row align="middle">
                <Col xs={4} md={8}>
                  {!media.matches ?
                    <div>
                      {React.createElement(isCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: collapseToggle,
                      })}
                    </div>
                    :
                    <div className='collapsed-btn' onClick={mobileShowDrawer}>
                      <MenuOutlined />
                    </div>
                  }
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
