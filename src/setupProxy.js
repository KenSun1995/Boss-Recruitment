const proxy = require("http-proxy-middleware");

module.exports = app => {
    app.use(proxy("/api/*", { target: "https://powerful-refuge-13768.herokuapp.com/" }));
};