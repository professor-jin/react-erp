const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/request',
    createProxyMiddleware({
      target: 'http://api_devs.wanxikeji.cn',
      changeOrigin: true,
      pathRewrite: {
        '^/request': ''
      }
    })
  );
};
