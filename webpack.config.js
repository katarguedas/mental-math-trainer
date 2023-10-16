const path = require('path');


module.exports = {
  entry: {
    index: '/src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'public','dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  mode: 'development'
};