/**
 * 网络请求配置
 */
import axios from 'axios'

// 拦截器
axios.interceptors.request.use(
  (config) => {
    config.data = JSON.stringify(config.data);
    config.headers = {
      "Content-Type": "application/json",
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应器
axios.interceptors.response.use(
  (response) => {

    const { code } = response.data;

    switch (code) {
      case 2010:
      case 2000:
        return response.data;
    }

  },
  (error) => {
    console.log('请求出错', error)
  }
)

export default axios;

