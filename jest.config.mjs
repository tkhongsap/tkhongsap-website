export default {
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/client/src/$1',
    '^@shared/(.*)$': '<rootDir>/shared/$1'
  },
  testMatch: ['**/tests/**/*.test.ts', '**/tests/**/*.test.tsx'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: {
        module: 'CommonJS',
        moduleResolution: 'Node',
        jsx: 'react-jsx',
        esModuleInterop: true,
        target: 'ES2022',
        strict: true,
        types: ['node', 'jest'],
      },
    }],
  }
};
