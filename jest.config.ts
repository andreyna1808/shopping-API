export default {
  bail: true,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/services/**/**.ts'],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageReporters: ['text-summary', 'lcov'],
  preset: 'ts-jest',
  testMatch: ['**/*.spec.ts'],
};
