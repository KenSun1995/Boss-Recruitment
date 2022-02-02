const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
    app.use('*/api/*', createProxyMiddleware({ target: 'https://myapp-boss-server.herokuapp.com/', changeOrigin: true }));
};