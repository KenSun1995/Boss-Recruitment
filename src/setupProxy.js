const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
    app.use('http://myapp-boss-client.herokuapp.com/api', createProxyMiddleware({ target: 'http://myapp-boss-server.herokuapp.com/', changeOrigin: true }));
}
module.exports = app => {
    app.listen(3000);
}