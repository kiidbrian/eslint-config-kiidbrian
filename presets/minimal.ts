import type {Linter} from "eslint";
import js from "@eslint/js";
import ts from "typescript-eslint";
import globals from "globals";

const minimalConfig: Linter.Config[] = [
  // Base ESLint recommended rules
  js.configs.recommended,

  // TypeScript recommended rules - minimal setup
  ...ts.configs.recommended,

  // Custom configuration
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.es2021,
      },
      parser: ts.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    files: ["**/*.ts", "**/*.tsx", "**/*.mts", "**/*.cts"],
    rules: {
      // Console and debugging
      "no-console": "warn",
      "no-debugger": "error",

      // Basic TypeScript rules
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",

      // General code quality
      "prefer-const": "error",
      "no-var": "error",
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
    },
  },

  // Ignore patterns
  {
    ignores: [
      "dist/**",
      "build/**",
      "node_modules/**",
      "*.min.js",
      "*.bundle.js",
      "coverage/**",
      ".next/**",
      ".nuxt/**",
      ".output/**",
      ".vercel/**",
      ".netlify/**",
      "public/**",
      "**/*.d.ts",
    ],
  },
];

export default minimalConfig;
