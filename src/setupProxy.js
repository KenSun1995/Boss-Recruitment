const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
    app.use(createProxyMiddleware("/api/*", { target: "https://powerful-refuge-13768.herokuapp.com/" }));
};