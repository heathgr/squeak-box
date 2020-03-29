const env = require('./getEnvironment')

console.log('Development Environment: ', env)

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: [
    './src',
  ],
  setupFilesAfterEnv: ['./jest.setup.ts'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
    env,
  },
}
