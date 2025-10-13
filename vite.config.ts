import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  root: '.',
  build: {
    outDir: resolve(__dirname, "dist/client"), 
    emptyOutDir: true,
  },
  test: {
    include: ["tests/test-ut/**/*.ts"],
    globals: true,
    environment: "node",
  }
});