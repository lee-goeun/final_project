const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
  app.use(
      createProxyMiddleware('/api', {
          target: 'http://118.67.142.229:3001/',
          changeOrigin: true
      })
  )
};