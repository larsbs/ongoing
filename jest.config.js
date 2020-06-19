module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      babelConfig: 'babel.config.js',
      tsConfig: {
        module: 'ESNext',
        noUnusedLocals: false,
        noUnusedParameters: false,
      },
    },
  },
  setupFilesAfterEnv: ['./jest.setup.ts'],
};
