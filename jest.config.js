const nextJest = require('next/jest');
const createJestConfig = nextJest({ dir: './' });

const config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.test.json'
    }
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: './tsconfig.test.json'
    }]
  }
};

module.exports = createJestConfig(config);