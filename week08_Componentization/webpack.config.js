const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const rootPath = path.resolve(__dirname);

module.exports = {
  entry: path.join(rootPath, "main.js"),
  output: {
    filename: "main.js",
    path: path.join(rootPath, "dist"),
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({
    template: path.join(rootPath, "./index.html")
  })],
};
/*
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const rootPath = path.resolve(__dirname);

module.exports = {
  entry: './main.js',
  devServer:{
    contentBase: "./dist"   //告诉dev-server，将dist文件下的文件挂载到localhost:8080下
  },
  
  module: {
    rules: [
      {
        test:/\.js$/,
        use: {
          loader: "babel-loader",
          options:{
            presets: ["@babel/preset-env"],
            plugins: [["@babel/plugin-transform-react-jsx",{pragma:"createElement"}]]
          }
        }
      }, {
          test:/\.(css|scss)$/, 
          use: ["style-loader", "css-loader"]
        },{
          test:/\.(png|jpeg|jpg|svg)$/,
          use:["file-loader"]
        }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    template: path.join(rootPath, "./main.html")
  })],
  mode:"development", //开发者模式，发布时改成production
}
*/ 