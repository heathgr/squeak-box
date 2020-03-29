/* eslint-disable @typescript-eslint/no-var-requires */
const { DefinePlugin } = require('webpack')
const { join } = require('path')
const env = require('./getEnvironment')

module.exports = {
  entry: join(__dirname, 'src/app.ts'),
  devServer: {
    contentBase: join(__dirname, 'static'),
  },
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
