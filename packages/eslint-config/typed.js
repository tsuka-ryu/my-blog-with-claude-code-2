import { config as baseConfig } from "./base.js";

/**
 * ESLint configuration with TypeScript type-aware rules.
 * Requires parserOptions.project to be set in consumer configurations.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const config = [
  ...baseConfig,
  {
    rules: {
      // Type-aware TypeScript rules
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/no-unnecessary-condition": "error",
      "@typescript-eslint/prefer-includes": "error",
      "@typescript-eslint/prefer-string-starts-ends-with": "error",
      "@typescript-eslint/switch-exhaustiveness-check": "error",
    },
  },
];