const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  output: {
    // 1. Нужно указать publicPath. Иначе, если находимся на стр типа /auth/signin, 
    // то будет 404. Т.к. файл браузер будет искать файл относительно auth (http://localhost:8082/auth/main.js)
    // 2. Когда загружаем аппку из хоста, то файл без publicPath браузер попытается взять с текущего урла (на котором развернут хост), а файл прилки лежит на другом.
    publicPath: 'http://localhost:8082/',
  },
  devServer: {
    port: 8082,
    historyApiFallback: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "auth",
      filename: "remoteEntry.js",
      exposes: {
        "./AuthApp": "./src/bootstrap.js",
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
