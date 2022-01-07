const {
    override,
    fixBabelImports,
    addLessLoader,
    addWebpackAlias,
} = require('customize-cra')
const path = require("path");

module.exports = override(
    fixBabelImports("import", {
        libraryName: "antd-mobile", libraryDirectory: "es", style: true // only true is ok to change color
    }),

    addWebpackAlias({
        "@": path.resolve(__dirname, "src"),
    }),

    addLessLoader({
        lessOptions: {
            javascriptEnabled: true,
            modifyVars: {
                "brand-primary-tap": "#EF6C00",
                "brand-primary": "#FF8F00",
            }
        }
    })
);
