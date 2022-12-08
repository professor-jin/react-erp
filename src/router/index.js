import Page404 from "../pages/page404/Page404";
import Login from '../pages/login'
import Index from '../pages/index'
import Management from '../pages/Management'
import GoodsList from '../pages/goods/goodsList'
import {UserOutlined} from "@ant-design/icons";

// todo 暂时添加key属性
const routes = [
  {
    path: '/',
    auth: false,
    element: <Login/>,
    label: '登录'
  },
  {
    path: '/404',
    auth: false,
    element: <Page404/>,
    label: '404'
  },
  {
    path: '/login',
    auth: false,
    element: <Login/>,
    label: '登录'
  },
  {
    path: '/index',
    key: '/index',
    auth: true,
    element: <Index/>,
    icon: <UserOutlined/>,
    label: '首页'
  },
  {
    path: '/goods',
    key: '/goods',
    auth: true,
    element: <Management/>,
    icon: <UserOutlined/>,
    label: '商品管理',
    children: [{
      key: '/goods/goodsList1',
      path: '/goods/goodsList',
      auth: true,
      element: <GoodsList/>,
      icon: <UserOutlined/>,
      label: '商品列表',
      children: [{
        key: '/goods/goodsList',
        path: '/goods/goodsList',
        auth: true,
        element: <GoodsList/>,
        icon: <UserOutlined/>,
        label: '商品列表测试'
      }]
    }]
  }
]

const obj = {};

function test(key, routes) {
  console.log(obj)
  for (let item of routes) {
    if (key === item.key) {
      obj['children'] = item;
      return;
    }
    if (item.children) {
      obj['key'] = item.key;
      obj['children'] = item.children;
      obj['path'] = item.path;
      obj['auth'] = item.auth;
      obj['element'] = item.element;
      obj['icon'] = item.icon;
      obj['label'] = item.label;
      return test(key, item.children)
    }
  }
};

test('/goods/goodsList', routes);


export default routes;
