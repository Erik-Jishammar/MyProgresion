import { defineConfig } from "vitest/config"; 
import path from "path";

export default defineConfig({
  root: '.',
  build: {
    outDir: "../dist/client",
    emptyOutDir: true,
  },
  test: {
    include: ["tests/test-ut/**/*.ts"],
    globals: true,
    environment: "node",
  }
});