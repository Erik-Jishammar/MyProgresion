import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/test-ut/**/*.test.ts'], 
    exclude: ['tests/tests-e2e/**'],         
  },
});