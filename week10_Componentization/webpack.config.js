var path = require('path');
module.exports = {
  entry: './index.js',
  devServer:{
    static: {
      directory: path.join(__dirname, 'dist')
    },
  },
  
  module:{
    rules:[
      {
        test:/\.js$/,
        use:{
          loader: "babel-loader",
          options:{
            presets: ["@babel/preset-env"],
            plugins: [["@babel/plugin-transform-react-jsx",{pragma:"createElement"}]]
          }
        }
      }
    ]
  },
  mode:'development' //开发者模式，发布时改成production
}


