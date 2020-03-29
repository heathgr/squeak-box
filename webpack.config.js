/* eslint-disable @typescript-eslint/no-var-requires */
const { DefinePlugin } = require('webpack')
const { join } = require('path')
const env = require('./getEnvironment')

console.log('Development Environment: ', env)

module.exports = {
  entry: join(__dirname, 'src/app.ts'),
  devServer: {
    contentBase: join(__dirname, 'static'),
  },
  devtool: 'eval-source-map',
  output: {
    filename: 'app.js',
    path: __dirname,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new DefinePlugin({
      env,
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
}
