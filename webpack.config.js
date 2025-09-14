const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  target: 'node',
  mode: process.env.NODE_ENV || 'development',
  resolve: {
    extensions: ['.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  externals: {
    // Don't bundle node_modules dependencies
  },
  devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'eval-source-map',
};