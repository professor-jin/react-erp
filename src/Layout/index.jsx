import React, {Suspense, useEffect, useState} from "react";
import {useLocation} from 'react-router-dom';
import UserMenu from './Menu';
import {Layout} from "antd";
import 'antd/dist/antd.min.css';
import routes from "../router";
import Headers from './Header'

function Layouts(props) {
  const {pathname} = useLocation();
  const {Sider, Content} = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const [menuList, setMenuList] = useState([]);

  // 白名单
  const excludesPage = ['/login', '/404', '/'];

  useEffect(() => {
    // todo 需要优化算法
    const newRoutes = routes.map(ele => {
      if (!excludesPage.includes(ele.path)) {
        return ele;
      }
    })
    setMenuList(newRoutes);

  }, [])

  if (excludesPage.includes(pathname)) {
    return <Suspense> {props.children}</Suspense>;
  } else {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">
            <img src='https://vue.ruoyi.vip/static/img/logo.4eeb8a8e.png'/>
            {
              !collapsed ? <span style={{color: 'white'}}>xxx管理系统</span> : ''
            }
          </div>
          <UserMenu menuList={menuList}/>
        </Sider>
        <Layout className="site-layout">
          <Headers collapsed={collapsed} onChangeCollapsed={setCollapsed}/>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <Suspense> {props.children}</Suspense>
          </Content>
        </Layout>
      </Layout>
    )
  }


}

export default Layouts;
