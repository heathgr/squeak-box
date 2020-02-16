/* eslint-disable @typescript-eslint/no-var-requires */
const { NormalModuleReplacementPlugin } = require('webpack')

const config = require('./webpack.config')

module.exports = {
  ...config,
  plugins: [
    new NormalModuleReplacementPlugin(
      /firebase.config/,
      './firebase.config.development.ts',
    ),
  ],
}
