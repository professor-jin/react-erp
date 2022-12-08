import React from "react";
import {Breadcrumb, Layout} from "antd";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import {useLocation} from "react-router-dom";

const Header = (props) => {
  const {collapsed, onChangeCollapsed} = props;
  const {Header} = Layout;
  const location = useLocation();
  // console.log(useRouteMatch())
  // console.log(location)
  return (
    <>
      <Header className="site-layout-background" style={{display: 'flex', alignItems: 'center'}}>
        <div>
          {
            React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => onChangeCollapsed(!collapsed)
            })
          }
        </div>

        <Breadcrumb>
          <Breadcrumb.Item>首页</Breadcrumb.Item>
          <Breadcrumb.Item></Breadcrumb.Item>
        </Breadcrumb>
      </Header>
    </>
  )


}

export default Header;
