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
  },
}
