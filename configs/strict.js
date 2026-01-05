import baseConfig from "./base.js";

export default [
  ...baseConfig,

  // Strict configuration overrides
  {
    rules: {
      // Stricter TypeScript rules
      "@typescript-eslint/no-explicit-any": "error", // Upgrade to error
      "@typescript-eslint/explicit-function-return-type": "warn", // Enable return type requirements

      // Stricter JSDoc requirements
      "jsdoc/require-description": "error", // Upgrade to error
      "jsdoc/require-param": "error", // Upgrade to error
      "jsdoc/require-returns": "error", // Upgrade to error

      // Stricter general rules
      "no-console": "error", // Upgrade to error
      "security/detect-object-injection": "error", // Upgrade to error

      // Additional strict rules
      complexity: ["error", 10], // Limit cyclomatic complexity
      "max-depth": ["error", 4], // Limit nesting depth
      "max-lines-per-function": ["error", 50], // Limit function length
      "max-params": ["error", 4], // Limit parameter count
    },
  },
];
