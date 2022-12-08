import {useLocation, useNavigate, useRoutes} from 'react-router-dom'
import {useEffect} from 'react'
import {getLocalStorage} from "../common/utils";
import {message} from "antd";


/**
 * 查询对应路由信息（路由嵌套？）
 * @param path route path
 * @param routes  Route Table
 * @returns {null|*}
 */
export function searchRouteDetail(path, routes) {
  for (let item of routes) {
    // && !item.children 防止嵌套路由匹配到父路由
    if (item.path === path && !item.children) return item;
    if (item.children) {
      return searchRouteDetail(path, item.children)
    }
  }
  return null;
}

// 全局路由守卫
function guard(location, navigate, routes) {
  const {pathname} = location;
  // 找到对应路由信息
  const routeDetail = searchRouteDetail(pathname, routes);

  if (routeDetail === null) {
    if (pathname !== '/404') {
      navigate('/404');
    }
    return;
  }

  // 是否是要权限验证
  if (routeDetail.auth) {
    const token = getLocalStorage('fnc-erp-userinfo');
    if (!token) {
      message.success({
        content: '登录状态失效，请重新登录。',
        style: {
          width: '1000px',
        },
        duration: 1
      });
      navigate('login')
    }
  }
}

const useRoutesWithGuard = (routes) => {
  const location = useLocation(); // 当前页面路由信息
  const navigate = useNavigate(); // 跳转页面方法

  useEffect(() => {
    guard(location, navigate, routes)
  }, [location, navigate, routes])

  return useRoutes(routes);
}

export default useRoutesWithGuard
