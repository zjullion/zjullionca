export default {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/**.{ts,tsx}'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['jestHelpers.ts', 'fixture.ts', 'test.ts'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  modulePathIgnorePatterns: ['/dist/'],
  preset: 'ts-jest',
  verbose: true,
}
