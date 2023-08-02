const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://tracking.ta-tmj.com',
      changeOrigin: true,
    })
  );
};
