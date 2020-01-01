module.exports = {
  preset: 'jest-puppeteer',
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest'
  },
  testPathIgnorePatterns: ['node_modules', '__apps__'],
  globalSetup: 'jest-environment-puppeteer/setup',
  globalTeardown: 'jest-environment-puppeteer/teardown',
  testEnvironment: 'jest-environment-puppeteer',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  globals: {
    'ts-jest': {
      tsConfig: {
        jsx: 'react'
      }
    }
  }
};
