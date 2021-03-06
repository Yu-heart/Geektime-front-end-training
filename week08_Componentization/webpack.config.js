var path = require('path');
module.exports = {
  entry: './main.js',
  devServer:{
    static: {
      directory: path.join(__dirname, 'dist'),
      // directory: path.join(__dirname, './main.html'),
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
  mode:'development'  
}
