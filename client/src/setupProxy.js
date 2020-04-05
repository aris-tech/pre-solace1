const { createProxyMiddleware } = require('http-proxy-middleware');
const config = require('../config');

// Note: This does not get hot reloaded, you have to restart app completely to apply changes
module.exports = function (app) {
  app.use(
    '/auth',
    createProxyMiddleware({
      target: config.proxy,
      changeOrigin: true,
    }),
  );
  app.use(
    '/api',
    createProxyMiddleware({
      target: config.proxy,
      changeOrigin: true,
    }),
  );
};
