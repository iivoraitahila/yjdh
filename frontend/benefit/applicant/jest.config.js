const sharedConfig = require('../../jest.config.js');
module.exports = {
  ...sharedConfig,
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/../../tsconfig.json',
    },
  },
  moduleNameMapper: {
    ['^test-utils']: '<rootDir>/../../shared/test/test-utils',
    [`^shared\/(.*)$`]: '<rootDir>/../../shared/src/$1',
    [`benefit/applicant\/(.*)$`]: '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: [
    '<rootDir>/../../shared/test/setupTests.ts',
    '<rootDir>/test/i18n/i18n-test.ts',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/pages/',
    '<rootDir>/../../shared/src/server/next-server.js',
    '<rootDir>/../../shared/test/',
  ],
};
