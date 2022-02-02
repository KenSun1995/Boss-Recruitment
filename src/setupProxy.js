const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
    app.use(createProxyMiddleware("/*", { target: "https://myapp-boss-server.herokuapp.com/" }));
};