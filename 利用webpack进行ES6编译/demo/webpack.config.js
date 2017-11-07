var path = require('path');
module.exports = {
  entry: "./es6/main.js",
  output: {
    path: __dirname,
    filename: "./js/index.js"
  },
  module: {
    loaders: [
      {
        test: path.join(__dirname, 'es6'),
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
}