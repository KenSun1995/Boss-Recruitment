const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
    app.use(createProxyMiddleware('/api/*', { target: 'https://myapp-boss-server.herokuapp.com/', changeOrigin: true }));
};